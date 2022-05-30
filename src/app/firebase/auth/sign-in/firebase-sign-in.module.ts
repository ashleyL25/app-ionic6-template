import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FirebaseSignInPage } from './firebase-sign-in.page';
import { ComponentsModule } from '../../../components/components.module';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { map } from 'rxjs/operators';

// Firebase guard to redirect logged in users to profile
const redirectLoggedInToProfile = (next) => map(user => {
  // when queryParams['auth-redirect'] don't redirect because we want
  // the component to handle the redirection
  if (user !== null && !next.queryParams['auth-redirect']) {
    return ['firebase/auth/profile'];
  } else {
    return true;
  }
});

const routes: Routes = [
  {
    path: '',
    component: FirebaseSignInPage,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfile }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [FirebaseSignInPage]
})
export class FirebaseSignInPageModule {}
