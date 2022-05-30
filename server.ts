import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

import { APP_BASE_HREF } from '@angular/common';
import * as MobileDetect from 'mobile-detect';

import { AppServerModule } from './src/main.server';
import { APP_ROUTES, REDIRECT_ROUTES } from './static-paths';


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/app/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y',
    // Avoid static assets errors invoke the next middleware (see: https://expressjs.com/en/4x/api.html#express.static)
    fallthrough: false
  }));

  // Check request user-agent and set the platform mode accordingly
  server.use((req, res, next) => {
    // Use Mobile Detect to set Ionic Config depending on the device
    const mobileDetect = new MobileDetect(req.headers['user-agent']);

    // This method returns the detected operating system string or null
    // (see: https://github.com/hgoebl/mobile-detect.js)
    const mobileDevice = mobileDetect.os();

    // Add custom header to the response we send to our Angular app. We will get this custom header in the AppModule
    res.set('mobile-device', mobileDevice);

    next();
  });

  // Add simple health check
  server.get('/health', (req, res, next) => {
    console.log('Checking app health ...');
    res.sendStatus(200);
  });

  console.log('Redirect ROUTES:');
  REDIRECT_ROUTES.forEach((route: ({from: string, to: string})) => {
    console.log(route);
    server.get(`${route.from}`, (req, res) => {
      // tslint:disable-next-line:no-console
      console.log(`GET: ${req.originalUrl}`);
      console.log(`Redirecting to: ${route.to}`);
      res.redirect(301, route.to);
    });
  });

  // To enable proper 404 redirects in non existent routes we need to specify the existing routes and then
  // add a '*' route for all the non existent routes to be treated with a 404 status
  console.log('Enabled ROUTES:');
  APP_ROUTES.forEach(route => {
    console.log(route);
    server.get(`${route}`, (req, res) => {
      // tslint:disable-next-line:no-console
      console.time(`GET: ${req.originalUrl}`);

      res.render(
        indexHtml,
        {
          req,
          res,
          providers: [
            {
              provide: APP_BASE_HREF,
              useValue: req.baseUrl
            }
          ]
        }
      );

      // tslint:disable-next-line:no-console
      console.timeEnd(`GET: ${req.originalUrl}`);
    });
  });

  // Properly handle 404's
  server.get('*', (req, res) => {
    console.log(req.originalUrl);

    // tslint:disable-next-line:no-console
    console.time(`GET: ${req.originalUrl} [404]`);
    res.status(404).render(indexHtml, {
      req,
      res,
      requestUrl: '/page-not-found',
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
    });
    // tslint:disable-next-line:no-console
    console.timeEnd(`GET: ${req.originalUrl} [404]`);
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
