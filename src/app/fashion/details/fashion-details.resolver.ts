import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { FashionService } from '../fashion.service';
import { FashionDetailsModel } from './fashion-details.model';

@Injectable()
export class FashionDetailsResolver implements Resolve<DataStore<FashionDetailsModel>> {

  constructor(private fashionService: FashionService) {}

  resolve(): DataStore<FashionDetailsModel> {
    const dataSource: Observable<FashionDetailsModel> = this.fashionService.getDetailsDataSource();
    const dataStore: DataStore<FashionDetailsModel> = this.fashionService.getDetailsStore(dataSource);

    return dataStore;
  }
}
