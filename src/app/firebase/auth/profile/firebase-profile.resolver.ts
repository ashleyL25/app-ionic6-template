import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Observable } from 'rxjs';
import { DataStore } from '../../../shell/data-store';
import { FirebaseProfileModel } from './firebase-profile.model';

@Injectable()
export class FirebaseProfileResolver implements Resolve<any> {

  constructor(private firebaseAuthService: FirebaseAuthService) {}

  resolve() {
    const dataSource: Observable<FirebaseProfileModel> = this.firebaseAuthService.getProfileDataSource();
    const dataStore: DataStore<FirebaseProfileModel> = this.firebaseAuthService.getProfileStore(dataSource);
    return dataStore;
  }
}
