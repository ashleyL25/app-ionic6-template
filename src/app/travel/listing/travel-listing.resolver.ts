import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { TravelService } from '../travel.service';
import { TravelListingModel } from './travel-listing.model';
import { SeoDataModel } from '../../utils/seo/seo-data.model';

@Injectable()
export class TravelListingResolver implements Resolve<any> {

  constructor(private travelService: TravelService) {}

  resolve():  { dataStore: DataStore<TravelListingModel>, seo: Observable<SeoDataModel> } {
    const dataSource: Observable<TravelListingModel> = this.travelService.getListingDataSource();
    const dataStore: DataStore<TravelListingModel> = this.travelService.getListingStore(dataSource);

    const seo = new SeoDataModel();
    seo.title = 'Travel Listing Page';
    seo.description = 'Travel Description';
    seo.keywords = 'travel, keywords, ionic, angular';

    return { dataStore: dataStore, seo: of(seo) };
  }
}
