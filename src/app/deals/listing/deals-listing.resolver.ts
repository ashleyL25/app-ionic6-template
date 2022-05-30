import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { DealsService } from '../deals.service';
import { DealsListingModel } from './deals-listing.model';

@Injectable()
export class DealsListingResolver implements Resolve<DataStore<DealsListingModel>> {

  constructor(private dealsService: DealsService) {}

  resolve(): DataStore<DealsListingModel> {
    const dataSource: Observable<DealsListingModel> = this.dealsService.getListingDataSource();
    const dataStore: DataStore<DealsListingModel> = this.dealsService.getListingStore(dataSource);

    return dataStore;
  }
}
