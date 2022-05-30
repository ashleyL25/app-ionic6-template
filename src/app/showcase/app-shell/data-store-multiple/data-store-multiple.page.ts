import { Component, OnInit } from '@angular/core';
import { ShowcaseService } from '../../showcase.service';
import { DataStore } from '../../../shell/data-store';
import { FashionListingModel } from '../../../fashion/listing/fashion-listing.model';
import { TravelListingModel } from '../../../travel/listing/travel-listing.model';

@Component({
  selector: 'app-data-store-multiple',
  templateUrl: './data-store-multiple.page.html',
  styleUrls: ['./data-store-multiple.page.scss'],
})
export class DataStoreMultiplePage implements OnInit {

  dataStoreA: DataStore<TravelListingModel>;
  dataStoreB: DataStore<FashionListingModel>;
  dataA: TravelListingModel;
  dataB: FashionListingModel;

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit() {

    const dataSourceA = this.showcaseService.getMultipleDataSourceA();
    const dataSourceB = this.showcaseService.getMultipleDataSourceB();

    const shellModelA: TravelListingModel = new TravelListingModel();
    this.dataStoreA = new DataStore(shellModelA);
    this.dataStoreA.load(dataSourceA);
    this.dataStoreA.state.subscribe(data => {
      this.dataA = data;
    });

    const shellModelB: FashionListingModel = new FashionListingModel();

    this.dataStoreB = new DataStore(shellModelB);
    this.dataStoreB.load(dataSourceB);
    this.dataStoreB.state.subscribe(data => {
      this.dataB = data;
    });

  }
}
