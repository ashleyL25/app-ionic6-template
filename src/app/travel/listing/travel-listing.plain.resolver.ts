import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { TravelService } from '../travel.service';
import { TravelListingModel } from './travel-listing.model';

@Injectable()
export class TravelListingPlainResolver implements Resolve<TravelListingModel> {

  constructor(private travelService: TravelService) {}

  resolve(): Observable<TravelListingModel> {
    return this.travelService.getListingDataSource();
  }
}
