import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseListingItemModel } from './firebase-listing.model';
import { FirebaseCrudService } from '../firebase-crud.service';
import { DataStore } from '../../../shell/data-store';

@Injectable()
export class FirebaseListingResolver implements Resolve<any> {

  constructor(private firebaseCrudService: FirebaseCrudService) {}

  resolve() {
    const dataSource: Observable<Array<FirebaseListingItemModel>> = this.firebaseCrudService.getListingDataSource();

    const dataStore: DataStore<Array<FirebaseListingItemModel>> = this.firebaseCrudService.getListingStore(dataSource);

    return dataStore;
  }
}
