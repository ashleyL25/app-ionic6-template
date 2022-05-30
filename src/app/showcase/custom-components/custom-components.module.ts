import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { CustomComponentsPage } from './custom-components.page';
import { ShowcaseService } from '../showcase.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomComponentsPage
      }
    ])
  ],
  declarations: [
    CustomComponentsPage
  ],
  providers: [
    ShowcaseService
  ]
})
export class CustomComponentsModule {}
