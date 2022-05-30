import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { RealEstateService } from '../real-estate.service';
import { RealEstateDetailsModel } from './real-estate-details.model';

@Injectable()
export class RealEstateDetailsResolver implements Resolve<DataStore<RealEstateDetailsModel>> {

  constructor(private realEstateService: RealEstateService) {}

  resolve(): DataStore<RealEstateDetailsModel> {
    const dataSource: Observable<RealEstateDetailsModel> = this.realEstateService.getDetailsDataSource();
    const dataStore: DataStore<RealEstateDetailsModel> = this.realEstateService.getDetailsStore(dataSource);

    return dataStore;
  }
}
