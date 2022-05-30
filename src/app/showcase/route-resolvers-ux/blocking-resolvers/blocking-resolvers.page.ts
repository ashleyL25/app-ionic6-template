import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// You can also use a Class object as a shell model
import { ShowcaseShellModel } from '../../showcase-shell.model';

@Component({
  selector: 'app-showcase-blocking-resolvers',
  templateUrl: './blocking-resolvers.page.html',
  styleUrls: ['./blocking-resolvers.page.scss']
})
export class BlockingResovlersPage implements OnInit {
  // We will assign data coming from the Route Resolver to this property
  routeResolveData: ShowcaseShellModel;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('Showcase Blocking Resovlers - ngOnInit()');

    if (this.route && this.route.data) {
      const dataObservable = this.route.data;
      console.log('Showcase Blocking Resovlers - Route Resolve Observable => dataObservable: ', dataObservable);

      if (dataObservable) {
        dataObservable.subscribe(observableValue => {
          const pageData: ShowcaseShellModel = observableValue['data'];
          // eslint-disable-next-line max-len
          console.log('Showcase Blocking Resovlers - Subscribe to dataObservable (will emmit just one value) => PageData (' + ((pageData && pageData.isShell) ? 'SHELL' : 'REAL') + '): ', pageData);
          if (pageData) {
            this.routeResolveData = pageData;
          }
        });
      } else {
        console.warn('No dataObservable coming from Route Resolver data');
      }
    } else {
      console.warn('No data coming from Route Resolver');
    }
  }
}
