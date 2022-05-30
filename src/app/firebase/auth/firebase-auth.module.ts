import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { FirebaseAuthService } from './firebase-auth.service';

const routes: Routes = [
  {
    path: '',
    children: [
      // /firebase/auth redirect
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./sign-in/firebase-sign-in.module').then(m => m.FirebaseSignInPageModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./sign-up/firebase-sign-up.module').then(m => m.FirebaseSignUpPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/firebase-profile.module').then(m => m.FirebaseProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [FirebaseAuthService]
})
export class FirebaseAuthModule {}
