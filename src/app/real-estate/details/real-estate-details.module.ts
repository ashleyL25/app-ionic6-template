import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { RealEstateService } from '../real-estate.service';
import { RealEstateDetailsPage } from './real-estate-details.page';
import { RealEstateDetailsResolver } from './real-estate-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: RealEstateDetailsPage,
    resolve: {
      data: RealEstateDetailsResolver
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
    RealEstateDetailsPage
  ],
  providers: [
    RealEstateDetailsResolver,
    RealEstateService
  ]
})
export class RealEstateDetailsPageModule {}
