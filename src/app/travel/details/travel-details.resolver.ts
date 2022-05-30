import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { TravelService } from '../travel.service';
import { TravelDetailsModel } from './travel-details.model';
import { map } from 'rxjs/operators';
import { SeoDataModel } from '../../utils/seo/seo-data.model';

@Injectable()
export class TravelDetailsResolver implements Resolve<any> {

  constructor(private travelService: TravelService) {}

  resolve(): { dataStore: DataStore<TravelDetailsModel>, seo: Observable<SeoDataModel> } {

    const dataSource: Observable<TravelDetailsModel> = this.travelService.getDetailsDataSource();

    // Typically, SEO titles, descriptions, etc depend on the data being resolved for a specific route
    const seoObservable: Observable<SeoDataModel> = dataSource.pipe(
      map(data => {
        const seo = new SeoDataModel();
        seo.title = data.name;
        seo.description = data.fullDescription;
        seo.keywords = data.category;
        return seo;
      })
    );

    const dataStore: DataStore<TravelDetailsModel> = this.travelService.getDetailsStore(dataSource);

    return { dataStore: dataStore, seo: seoObservable };
  }
}
