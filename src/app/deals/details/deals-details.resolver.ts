import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { DealsService } from '../deals.service';
import { DealsDetailsModel } from './deals-details.model';

@Injectable()
export class DealsDetailsResolver implements Resolve<DataStore<DealsDetailsModel>> {

  constructor(private dealsService: DealsService) {}

  resolve(): DataStore<DealsDetailsModel> {
    const dataSource: Observable<DealsDetailsModel> = this.dealsService.getDetailsDataSource();
    const dataStore: DataStore<DealsDetailsModel> = this.dealsService.getDetailsStore(dataSource);

    return dataStore;
  }
}
