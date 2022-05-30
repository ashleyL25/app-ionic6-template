import { Component, OnInit } from '@angular/core';
import { ShowcaseService } from '../../showcase.service';
import { DataStore } from '../../../shell/data-store';
import { ShowcaseCombinedTaskUserModel } from '../../showcase-shell.model';

@Component({
  selector: 'app-data-store-combined',
  templateUrl: './data-store-combined.page.html',
  styleUrls: ['./data-store-combined.page.scss'],
})
export class DataStoreCombinedPage implements OnInit {

  tasksCombinedDataStore: DataStore<Array<ShowcaseCombinedTaskUserModel>>;
  tasks: Array<ShowcaseCombinedTaskUserModel>;

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit() {
    // We created ShowcaseCombinedTaskUserModel to combine the task with his user data.
    // They are 2 different collections (or data tables in the DB) and we need to combine them into 1 dataSource.

    const dataSource = this.showcaseService.getCombinedTasksUserDataSource();

    const shellModel: Array<ShowcaseCombinedTaskUserModel> = [
      new ShowcaseCombinedTaskUserModel(),
      new ShowcaseCombinedTaskUserModel(),
      new ShowcaseCombinedTaskUserModel(),
      new ShowcaseCombinedTaskUserModel()
    ];

    this.tasksCombinedDataStore = new DataStore(shellModel);
    this.tasksCombinedDataStore.load(dataSource);

    this.tasksCombinedDataStore.state.subscribe(data => {
      this.tasks = data;
    });
  }

}
