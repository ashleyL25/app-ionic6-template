import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isPlatformServer } from '@angular/common';

import { DataStore } from '../shell/data-store';
import { TransferStateHelper } from '../utils/transfer-state-helper';
import { FashionListingModel } from './listing/fashion-listing.model';
import { FashionDetailsModel } from './details/fashion-details.model';

@Injectable()
export class FashionService {
  private listingDataStore: DataStore<FashionListingModel>;
  private detailsDataStore: DataStore<FashionDetailsModel>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transferStateHelper: TransferStateHelper,
    private http: HttpClient
  ) { }

  public getListingDataSource(): Observable<FashionListingModel> {
    const rawDataSource = this.http.get<FashionListingModel>('./assets/sample-data/fashion/listing.json')
    .pipe(
      map(
        (data: FashionListingModel) => {
          // Note: HttpClient cannot know how to instantiate a class for the returned data
          // We need to properly cast types from json data
          const listing = new FashionListingModel();

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
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('fashion-listing-state', rawDataSource);

    return cachedDataSource;
  }

  public getListingStore(dataSource: Observable<FashionListingModel>): DataStore<FashionListingModel> {
    // Check if we already loaded this object
    if (!this.listingDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: FashionListingModel = new FashionListingModel();
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

  public getDetailsDataSource(): Observable<FashionDetailsModel> {
    const rawDataSource = this.http.get<FashionDetailsModel>('./assets/sample-data/fashion/details.json')
    .pipe(
      map(
        (data: FashionDetailsModel) => {
          // Note: HttpClient cannot know how to instantiate a class for the returned data
          // We need to properly cast types from json data
          const details = new FashionDetailsModel();

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
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('fashion-details-state', rawDataSource);

    return cachedDataSource;
  }

  public getDetailsStore(dataSource: Observable<FashionDetailsModel>): DataStore<FashionDetailsModel> {
    // Check if we already loaded this object
    if (!this.detailsDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: FashionDetailsModel = new FashionDetailsModel();
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
