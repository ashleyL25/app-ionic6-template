import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

import { DealsService } from '../deals.service';
import { DealsListingPage } from './deals-listing.page';
import { DealsListingResolver } from './deals-listing.resolver';

const routes: Routes = [
  {
    path: '',
    component: DealsListingPage,
    resolve: {
      data: DealsListingResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule
  ],
  declarations: [
    DealsListingPage
  ],
  providers: [
    DealsListingResolver,
    DealsService
  ]
})
export class DealsListingPageModule {}
