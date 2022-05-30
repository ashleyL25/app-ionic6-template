import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// You can also use a Class object as a shell model
import { ShowcaseShellModel } from '../../showcase-shell.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-showcase-progressive-shell-resolvers',
  templateUrl: './progressive-shell-resolvers.page.html',
  styleUrls: ['./progressive-shell-resolvers.page.scss']
})
export class ProgressiveShellResovlersPage implements OnInit {
  // We will assign data coming from the Route Resolver to this property
  routeResolveData: ShowcaseShellModel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('Showcase Progressive Shell Resovlers - ngOnInit()');

    this.route.data
    .pipe(
      // Extract data for this page
      switchMap((resolvedRouteData) => resolvedRouteData['data'].state)
    )
    .subscribe((state: any) => {
      this.routeResolveData = state;
    }, (error) => console.log(error));
  }
}
