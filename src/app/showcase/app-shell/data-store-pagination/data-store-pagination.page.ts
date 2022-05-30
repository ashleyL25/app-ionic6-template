import { Component, OnInit } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ShowcaseShellUserModel } from '../../showcase-shell.model';
import { ShowcaseService } from '../../showcase.service';

import { DataStore, ShellModel } from '../../../shell/data-store';

@Component({
  selector: 'app-data-store-pagination',
  templateUrl: './data-store-pagination.page.html',
  styleUrls: ['./data-store-pagination.page.scss'],
})
export class DataStorePaginationPage implements OnInit {
  // View model
  pagedUsers: Array<ShowcaseShellUserModel> & ShellModel;

  // View data store
  remoteApiDataStore: DataStore<Array<ShowcaseShellUserModel>>;

  loadMorePages = true;
  currentPage = 0;

  triggerNewPageLoading: Subject<any> = new Subject<any>();
  newPageTriggerObservable: Observable<any> = this.triggerNewPageLoading.asObservable();

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit() {
    const dataSource = this.showcaseService.getPaginationDataSource(1);

    if (!this.remoteApiDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: Array<ShowcaseShellUserModel> = [
        new ShowcaseShellUserModel(),
        new ShowcaseShellUserModel()
      ];
      this.remoteApiDataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.remoteApiDataStore.load(dataSource);
    }

    const newDataObservable = this.newPageTriggerObservable.pipe(
      switchMap((pageNumber) => {
        const pageDataSource = this.showcaseService.getPaginationDataSource(pageNumber);
        const newDataShell = [
          new ShowcaseShellUserModel(),
          new ShowcaseShellUserModel(),
          new ShowcaseShellUserModel()
        ];

        const dataSourceWithShellObservable = DataStore.AppendShell(pageDataSource, newDataShell, 400);

        return dataSourceWithShellObservable;
      })
    );

    merge(
      this.remoteApiDataStore.state,
      newDataObservable
    )
    .subscribe(result => {
      console.log('result', result);

      // When successfully load next page, update currentPage pointer
      if (!result.isShell && result.length > 0) {
        this.currentPage ++;
      }

      if (this.loadMorePages) {
        this.pagedUsers = result;
      }

      if (this.currentPage === 4) {
        this.loadMorePages = false;
      }
    });
  }

  getNextPageUsers(): void {
    this.triggerNewPageLoading.next(this.currentPage + 1);
  }
}
