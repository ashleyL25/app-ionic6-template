import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { RealEstateService } from '../real-estate.service';
import { RealEstateListingModel } from './real-estate-listing.model';

@Injectable()
export class RealEstateListingResolver implements Resolve<DataStore<RealEstateListingModel>> {

  constructor(private realEstateService: RealEstateService) {}

  resolve(): DataStore<RealEstateListingModel> {
    const dataSource: Observable<RealEstateListingModel> = this.realEstateService.getListingDataSource();
    const dataStore: DataStore<RealEstateListingModel> = this.realEstateService.getListingStore(dataSource);

    return dataStore;
  }
}
