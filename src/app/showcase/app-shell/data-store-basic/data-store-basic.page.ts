import { Component, OnInit } from '@angular/core';
import { take, finalize } from 'rxjs/operators';

import { ShowcaseShellModel } from '../../showcase-shell.model';
import { ShowcaseService } from '../../showcase.service';

import { DataStore } from '../../../shell/data-store';

@Component({
  selector: 'app-data-store-basic',
  templateUrl: './data-store-basic.page.html',
  styleUrls: ['./data-store-basic.page.scss'],
})
export class DataStoreBasicPage implements OnInit {
  // Fetch data with the DataStore utility and assign it to this property
  // DataStore data is async (Observable)
  dataStoreData: ShowcaseShellModel;
  dataStoreButtonDisabled = true;

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit() {
    this.showcaseDataStore();
  }

  showcaseDataStore(): void {
    // Prevent rage clicks on the 'Fetch more Data' button
    this.dataStoreButtonDisabled = true;

    const dataSource = this.showcaseService.getSimpleDataSource();

    // Initialize the model specifying that it is a shell model
    const shellModel: ShowcaseShellModel = new ShowcaseShellModel();
    const dataStore = new DataStore(shellModel);
    // Trigger the loading mechanism (with shell) in the dataStore
    dataStore.load(dataSource);

    dataStore.state.pipe(
      take(2), // DataStore will emit a mock object and the real data fetched from the source. Emit those two values and then complete.
      finalize(() => this.dataStoreButtonDisabled = false)
    ).subscribe(data => {
      this.dataStoreData = data;
    });
  }
}
