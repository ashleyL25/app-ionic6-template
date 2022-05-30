import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { FoodService } from '../food.service';
import { FoodListingModel } from './food-listing.model';

@Injectable()
export class FoodListingResolver implements Resolve<DataStore<FoodListingModel>> {

  constructor(private foodService: FoodService) {}

  resolve(): DataStore<FoodListingModel> {
    const dataSource: Observable<FoodListingModel> = this.foodService.getListingDataSource();
    const dataStore: DataStore<FoodListingModel> = this.foodService.getListingStore(dataSource);

    return dataStore;
  }
}
