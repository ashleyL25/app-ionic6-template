import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { TravelService } from '../travel.service';
import { TravelDetailsModel } from './travel-details.model';

@Injectable()
export class TravelDetailsPlainResolver implements Resolve<TravelDetailsModel> {

  constructor(private travelService: TravelService) {}

  resolve(): Observable<TravelDetailsModel> {
    return this.travelService.getDetailsDataSource();
  }
}
