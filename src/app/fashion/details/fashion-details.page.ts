import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { IResolvedRouteData, ResolverHelper } from '../../utils/resolver-helper';
import { FashionDetailsModel } from './fashion-details.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-fashion-details',
  templateUrl: './fashion-details.page.html',
  styleUrls: [
    './styles/fashion-details.page.scss',
    './styles/fashion-details.shell.scss',
    './styles/fashion-details.ios.scss',
    './styles/fashion-details.md.scss'
  ]
})
export class FashionDetailsPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;

  details: FashionDetailsModel;
  colorVariants = [];
  sizeVariants = [];
  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };

  @HostBinding('class.is-shell') get isShell() {
    return (this.details && this.details.isShell) ? true : false;
  }

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController
  ) { }

  ngOnInit(): void {

    this.subscriptions = this.route.data
    .pipe(
      // Extract data for this page
      switchMap((resolvedRouteData: IResolvedRouteData<FashionDetailsModel>) => {
        return ResolverHelper.extractData<FashionDetailsModel>(resolvedRouteData.data, FashionDetailsModel);
      })
    )
    .subscribe((state) => {
      this.details = state;

      this.colorVariants = this.details.colorVariants
      .map(item =>
        ({
          name: item.name,
          type: 'radio',
          label: item.name,
          value: item.value,
          checked: item.default
        })
      );

      this.sizeVariants = this.details.sizeVariants
      .map(item =>
        ({
          name: item.name,
          type: 'radio',
          label: item.name,
          value: item.value,
          checked: item.default
        })
      );
    }, (error) => console.log(error));
  }

  async openColorChooser() {
    const alert = await this.alertController.create({
      header: 'Color',
      inputs: this.colorVariants,
      cssClass: 'variant-alert color-chooser',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async openSizeChooser() {
    const alert = await this.alertController.create({
      header: 'Size',
      inputs: this.sizeVariants,
      cssClass: 'variant-alert size-chooser',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: (selectedValue) => {
            console.log('Selected Value', selectedValue);
          }
        }
      ]
    });

    await alert.present();
  }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {
    this.subscriptions.unsubscribe();
  }
}
