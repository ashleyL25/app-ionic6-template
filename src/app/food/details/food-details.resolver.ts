import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { FoodService } from '../food.service';
import { FoodDetailsModel } from './food-details.model';

@Injectable()
export class FoodDetailsResolver implements Resolve<DataStore<FoodDetailsModel>> {

  constructor(private foodService: FoodService) {}

  resolve(route: ActivatedRouteSnapshot): DataStore<FoodDetailsModel> {
    const itemSlug = route.paramMap.get('productId');

    const dataSource: Observable<FoodDetailsModel> = this.foodService.getDetailsDataSource(itemSlug);
    const dataStore: DataStore<FoodDetailsModel> = this.foodService.getDetailsStore(dataSource);

    return dataStore;
  }
}
