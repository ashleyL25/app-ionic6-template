import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { defer } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ShowcaseService } from '../../showcase.service';

@Injectable()
export class BlockingResolver implements Resolve<any> {
  private loadingElement: any;

  constructor(
    private showcaseService: ShowcaseService,
    private loadingController: LoadingController
  ) { }

  async presentLoader() {
    this.loadingElement = await this.loadingController.create({
      message: 'Loading ...'
    });

    await this.loadingElement.present();
  }

  async dismissLoader() {
    if (this.loadingElement) {
      await this.loadingElement.dismiss();
    }
  }

  resolve() {
    // WITHOUT LOADING INDICATOR

    // Base Observable (where we get data from)
    // const dataObservable = this.showcaseService.getData();

    // Basic Resolver that returns the base Observable
    // return dataObservable;


    // WITH LOADING INDICATOR

    // Base Observable (where we get data from)
    const dataObservable = this.showcaseService.getDataSourceWithDelay().pipe(
      finalize(() => {
        console.log('dataObservable COMPLETED - HIDE LOADER');
        this.dismissLoader();
      })
    );

    const deferedObservable = defer(() => {
      // Will be logged at the moment of subscription
      console.log('dataObservable STARTED - SHOW LOADER');
      this.presentLoader();
      return dataObservable;
    });

    // Basic Resolver that returns the base Observable
    return deferedObservable;
  }
}
