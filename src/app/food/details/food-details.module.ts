import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

import { FoodService } from '../food.service';
import { FoodDetailsPage } from './food-details.page';
import { FoodDetailsResolver } from './food-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: FoodDetailsPage,
    resolve: {
      data: FoodDetailsResolver
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
    FoodDetailsPage
  ],
  providers: [
    FoodDetailsResolver,
    FoodService
  ]
})
export class FoodDetailsPageModule {}
