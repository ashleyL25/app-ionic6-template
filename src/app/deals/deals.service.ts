import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as dayjs from 'dayjs';

import { DataStore } from '../shell/data-store';
import { DealsListingModel } from './listing/deals-listing.model';
import { DealsDetailsModel } from './details/deals-details.model';
import { TransferStateHelper } from '../utils/transfer-state-helper';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class DealsService {
  private listingDataStore: DataStore<DealsListingModel>;
  private detailsDataStore: DataStore<DealsDetailsModel>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transferStateHelper: TransferStateHelper,
    private http: HttpClient
  ) { }

  get relativeDates(): Array<string> {
    return [
      dayjs().add(1, 'day').add(8, 'hour').add(10, 'second').format('MM/DD/YYYY HH:mm:ss') as string,
      dayjs().add(7, 'day').format('MM/DD/YYYY') as string,
      dayjs().subtract(1, 'month').format('MM/DD/YYYY') as string,
      dayjs().add(2, 'month').format('MM/DD/YYYY') as string
    ];
  }

  public getListingDataSource(): Observable<DealsListingModel> {
    const rawDataSource = this.http.get<DealsListingModel>('./assets/sample-data/deals/listing.json')
    .pipe(
      map(
        (data: DealsListingModel) => {
          // Using rest operator to divide the data (see: https://dev.to/napoleon039/how-to-use-the-spread-and-rest-operator-4jbb)
          const {items, ...otherData} = data;

          const itemsWithRelativeDates = items.map((dealItem, index) => {
            // Relative date (better to showcase UI micro-interactions)
            return {...dealItem, expirationDate: this.relativeDates[index]};
          });

          // Using spread operator to concat the data (see: https://dev.to/napoleon039/how-to-use-the-spread-and-rest-operator-4jbb)
          const updatedListingData = {...otherData, items: itemsWithRelativeDates};

          // Note: HttpClient cannot know how to instantiate a class for the returned data
          // We need to properly cast types from json data
          const listing = new DealsListingModel();

          // The Object.assign() method copies all enumerable own properties from one or more source objects to a target object.
          // Note: If you have non-enummerable properties, you can try a spread operator instead. listing = {...data};
          // (see: https://scotch.io/bar-talk/copying-objects-in-javascript#toc-using-spread-elements-)
          Object.assign(listing, updatedListingData);

          return listing;
        }
      )
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('deals-listing-state', rawDataSource);

    return cachedDataSource;
  }

  public getListingStore(dataSource: Observable<DealsListingModel>): DataStore<DealsListingModel> {
    // Use cache if available
    if (!this.listingDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: DealsListingModel = new DealsListingModel();
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

  public getDetailsDataSource(): Observable<DealsDetailsModel> {
    const rawDataSource = this.http.get<DealsDetailsModel>('./assets/sample-data/deals/details.json')
    .pipe(
      map(
        (data: DealsDetailsModel) => {
          const expirationDate = dayjs().add(1, 'day').add(8, 'hour').add(10, 'second').format('MM/DD/YYYY HH:mm:ss') as string;
          const updatedDetailsData = {...data, expirationDate};

          // Note: HttpClient cannot know how to instantiate a class for the returned data
          // We need to properly cast types from json data
          const details = new DealsDetailsModel();

          // The Object.assign() method copies all enumerable own properties from one or more source objects to a target object.
          // Note: If you have non-enummerable properties, you can try a spread operator instead. details = {...data};
          // (see: https://scotch.io/bar-talk/copying-objects-in-javascript#toc-using-spread-elements-)
          Object.assign(details, updatedDetailsData);

          return details;
        }
      )
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('deals-details-state', rawDataSource);

    return cachedDataSource;
  }

  public getDetailsStore(dataSource: Observable<DealsDetailsModel>): DataStore<DealsDetailsModel> {
    // Initialize the model specifying that it is a shell model
    const shellModel: DealsDetailsModel = new DealsDetailsModel();
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

    return this.detailsDataStore;
  }

}
