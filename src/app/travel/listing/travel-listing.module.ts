import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { TravelService } from '../travel.service';
import { TravelListingPage } from './travel-listing.page';
import { TravelListingResolver } from './travel-listing.resolver';
import { TravelListingPlainResolver } from './travel-listing.plain.resolver';

const routes: Routes = [
  {
    path: '',
    component: TravelListingPage,
    resolve: {
      data: TravelListingResolver
      // data: TravelListingPlainResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [
    TravelListingPage
  ],
  providers: [
    TravelListingResolver,
    TravelListingPlainResolver,
    TravelService
  ]
})
export class TravelListingPageModule {}
