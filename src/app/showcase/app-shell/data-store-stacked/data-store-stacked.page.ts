import { Component, OnInit } from '@angular/core';
import { Observable, of, ReplaySubject, Subject, merge } from 'rxjs';

import { ShowcaseShellUserModel } from '../../showcase-shell.model';
import { ShowcaseService } from '../../showcase.service';

import { DataStore } from '../../../shell/data-store';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-data-store-stacked',
  templateUrl: './data-store-stacked.page.html',
  styleUrls: ['./data-store-stacked.page.scss'],
})
export class DataStoreStackedPage implements OnInit {
  // View model
  stackedUsers: Array<Observable<ShowcaseShellUserModel>> = [];
  shellUsers: Array<Observable<ShowcaseShellUserModel>> = [];
  // View data store (it's an open stream of data)
  openDataStore: DataStore<Array<ShowcaseShellUserModel>>;

  // Emulate a tream of events that trigger the loading of new items
  triggerNewItemsLoading: Subject<any> = new Subject<any>();
  newItemsTriggerObservable: Observable<any> = this.triggerNewItemsLoading.asObservable();

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit() {
    const openDataStream = this.showcaseService.getOpenDataStream();

    if (!this.openDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: Array<ShowcaseShellUserModel> = [
        new ShowcaseShellUserModel(),
        new ShowcaseShellUserModel(),
        new ShowcaseShellUserModel(),
        new ShowcaseShellUserModel()
      ];
      this.openDataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.openDataStore.load(openDataStream);
    }

    // Each time the user triggers the loading of new items, ask the service to get those new items
    const newDataObservable = this.newItemsTriggerObservable.pipe(
      switchMap(() => {
        const newValuesObservable = this.showcaseService.getStackedValuesDataSource();

        const newDataShell = [
          new ShowcaseShellUserModel(),
          new ShowcaseShellUserModel()
        ];

        const newValuesWithShellObservable = DataStore.AppendShell(newValuesObservable, newDataShell, 400);

        return newValuesWithShellObservable;
      })
    );

    merge(
      this.openDataStore.state,
      newDataObservable
    )
    .subscribe(data => {
      console.log('data', data);

      if (data.isShell) {
        const shellsAsObservables = [...data].map((val) => {
          // Transform plain shell values into async Observables (to comply with the layout markup)
          return of(val);
        });

        // When loading new data, override the shellUsers property
        this.shellUsers = shellsAsObservables;
      } else {
        // Clear shellUsers property
        this.shellUsers = [];

        const dataWithShell = [...data].map((val) => {
          // Transform plain values into async Observables (to comply with the layout markup)
          return DataStore.AppendShell(of(val), new ShowcaseShellUserModel(), 400);
        });

        // Concat data to existing stackedUsers property
        this.stackedUsers.push(...dataWithShell);
      }
    });
  }

  loadStackedResults(): void {
    this.triggerNewItemsLoading.next(null);
  }

  pushValuesToOpenStream(): void {
    this.showcaseService.pushValuesToOpenStream();
  }
}
