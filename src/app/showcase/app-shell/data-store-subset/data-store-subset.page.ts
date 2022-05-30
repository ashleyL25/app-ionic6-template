import { Component, OnInit } from '@angular/core';
import { ShowcaseService } from '../../showcase.service';
import { DataStore } from '../../../shell/data-store';
import { ShowcaseCompanyModel } from '../../showcase-shell.model';

@Component({
  selector: 'app-data-store-subset',
  templateUrl: './data-store-subset.page.html',
  styleUrls: ['./data-store-subset.page.scss'],
})
export class DataStoreSubsetPage implements OnInit {

  companyDataStore: DataStore<ShowcaseCompanyModel>;
  company: ShowcaseCompanyModel;

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit() {

    const dataSource = this.showcaseService.getUserSubsetData(2);

    const shellModel: ShowcaseCompanyModel = new ShowcaseCompanyModel();

    this.companyDataStore = new DataStore(shellModel);
    this.companyDataStore.load(dataSource);

    this.companyDataStore.state.subscribe(data => {
      this.company = data;
    });
  }

}
