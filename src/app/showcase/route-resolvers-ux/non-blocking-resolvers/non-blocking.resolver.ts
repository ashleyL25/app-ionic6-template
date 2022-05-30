import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ShowcaseService } from '../../showcase.service';

@Injectable()
export class NonBlockingResolver implements Resolve<any> {

  constructor(private showcaseService: ShowcaseService) {}

  resolve() {

    // Base Observable (where we get data from)
    const dataObservable = this.showcaseService.getDataSourceWithDelay();

    // NON-BLOCKING RESOLVERS

    // Resolver using a ReplySubject that emits the base Observable and then completes
    // const subject = new ReplaySubject();
    // subject.next(dataObservable);
    // subject.complete();
    // return subject;

    // Resolver using an Observable that emits the base Observable and then completes
    // const observable = Observable.create((observer) => {
    //   observer.next(dataObservable);
    //   observer.complete();
    // });
    // return observable;

    // Resolver using a Promise that resolves the base Observable
    const observablePromise = new Promise((resolve, reject) => {
      resolve(dataObservable);
    });
    return observablePromise;
  }
}
