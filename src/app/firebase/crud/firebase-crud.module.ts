import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

const firebaseRoutes: Routes = [
  {
    path: '',
    children: [
      // /firebase/crud redirect
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full',
      },
      {
        path: 'listing',
        loadChildren: () => import('./../crud/listing/firebase-listing.module').then(m => m.FirebaseListingPageModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./../crud/user/firebase-user-details.module').then(m => m.FirebaseUserDetailsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(firebaseRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
})
export class FirebaseCrudModule {}
