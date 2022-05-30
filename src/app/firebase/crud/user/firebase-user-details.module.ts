import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components/components.module';
import { FirebaseUserDetailsPage } from './details/firebase-user-details.page';
import { FirebaseUserDetailsResolver } from './firebase-user-details.resolver';
import { FirebaseUpdateUserModalComponent } from './update/firebase-update-user.modal';
import { FirebaseCrudService } from '../firebase-crud.service';
import { FirebaseCrudSharedModule } from '../firebase-crud-shared.module';

const routes: Routes = [
  {
    path: '',
    component: FirebaseUserDetailsPage,
    resolve: {
      data: FirebaseUserDetailsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FirebaseCrudSharedModule
  ],
  declarations: [
    FirebaseUserDetailsPage,
    FirebaseUpdateUserModalComponent
  ],
  providers: [
    FirebaseCrudService,
    FirebaseUserDetailsResolver
  ]
})
export class FirebaseUserDetailsPageModule {}
