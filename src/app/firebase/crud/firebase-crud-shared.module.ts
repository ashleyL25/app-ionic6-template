import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../../components/components.module';
import { FirebaseCreateUserModalComponent } from './user/create/firebase-create-user.modal';
import { SelectUserImageModalComponent } from './user/select-image/select-user-image.modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FirebaseCreateUserModalComponent,
    SelectUserImageModalComponent
  ],
  exports: [
    SelectUserImageModalComponent,
    FirebaseCreateUserModalComponent
  ]
})
export class FirebaseCrudSharedModule {}
