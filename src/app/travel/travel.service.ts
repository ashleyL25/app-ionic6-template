import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataStore } from '../shell/data-store';
import { TravelListingModel } from './listing/travel-listing.model';
import { TravelDetailsModel } from './details/travel-details.model';
import { TransferStateHelper } from '../utils/transfer-state-helper';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class TravelService {
  private listingDataStore: DataStore<TravelListingModel>;
  private detailsDataStore: DataStore<TravelDetailsModel>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transferStateHelper: TransferStateHelper,
    private http: HttpClient
  ) { }

  public getListingDataSource(): Observable<TravelListingModel> {
    const rawDataSource = this.http.get<TravelListingModel>('./assets/sample-data/travel/listing.json')
    .pipe(
      map(
        (data: TravelListingModel) => {
          // Note: HttpClient cannot know how to instantiate a class for the returned data
          // We need to properly cast types from json data
          const listing = new TravelListingModel();

          // The Object.assign() method copies all enumerable own properties from one or more source objects to a target object.
          // Note: If you have non-enummerable properties, you can try a spread operator instead. listing = {...data};
          // (see: https://scotch.io/bar-talk/copying-objects-in-javascript#toc-using-spread-elements-)
          Object.assign(listing, data);

          return listing;
        }
      )
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('travel-listing-state', rawDataSource);

    return cachedDataSource;
  }

  public getListingStore(dataSource: Observable<TravelListingModel>): DataStore<TravelListingModel> {
    // Use cache if available
    if (!this.listingDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: TravelListingModel = new TravelListingModel();
      this.listingDataStore = new DataStore(shellModel);

      // If running in the server, then don't add shell to the Data Store
      // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
      if (isPlatformServer(this.platformId) || dataSource['ssr_state']) {
        // Trigger loading mechanism with 0 delay (this will prevent the shell to be shown)
        this.listingDataStore.load(dataSource, 0);
      } else { // On browser transitions
        // Trigger the loading mechanism (with shell)
        this.listingDataStore.load(dataSource);
      }
    }
    return this.listingDataStore;
  }

  public getDetailsDataSource(): Observable<TravelDetailsModel> {
    const rawDataSource = this.http.get<TravelDetailsModel>('./assets/sample-data/travel/details.json')
    .pipe(
      map(
        (data: TravelDetailsModel) => {
          // Note: HttpClient cannot know how to instantiate a class for the returned data
          // We need to properly cast types from json data
          const details = new TravelDetailsModel();

          // The Object.assign() method copies all enumerable own properties from one or more source objects to a target object.
          // Note: If you have non-enummerable properties, you can try a spread operator instead. details = {...data};
          // (see: https://scotch.io/bar-talk/copying-objects-in-javascript#toc-using-spread-elements-)
          Object.assign(details, data);

          return details;
        }
      )
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('travel-details-state', rawDataSource);

    return cachedDataSource;
  }

  public getDetailsStore(dataSource: Observable<TravelDetailsModel>): DataStore<TravelDetailsModel> {
    // Use cache if available
    if (!this.detailsDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: TravelDetailsModel = new TravelDetailsModel();
      this.detailsDataStore = new DataStore(shellModel);

      // If running in the server, then don't add shell to the Data Store
      // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
      if (isPlatformServer(this.platformId) || dataSource['ssr_state']) {
        // Trigger loading mechanism with 0 delay (this will prevent the shell to be shown)
        this.detailsDataStore.load(dataSource, 0);
      } else { // On browser transitions
        // Trigger the loading mechanism (with shell)
        this.detailsDataStore.load(dataSource);
      }
    }

    return this.detailsDataStore;
  }
}

