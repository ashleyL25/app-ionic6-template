import { Component, OnInit } from '@angular/core';
import { ShowcasePostModel, ShowcaseCommentModel } from '../../showcase-shell.model';
import { ShowcaseService } from '../../showcase.service';
import { DataStore } from '../../../shell/data-store';

@Component({
  selector: 'app-data-store-dependant',
  templateUrl: './data-store-dependant.page.html',
  styleUrls: ['./data-store-dependant.page.scss'],
})
export class DataStoreDependantPage implements OnInit {

  postDataStore: DataStore<ShowcasePostModel>;
  commentsDataStore: DataStore<Array<ShowcaseCommentModel>>;
  post: ShowcasePostModel;
  comments: Array<ShowcaseCommentModel>;

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit() {

    const postDataSource = this.showcaseService.getDependantDataSourcePost();

    const postShellModel: ShowcasePostModel = new ShowcasePostModel();
    this.postDataStore = new DataStore(postShellModel);
    this.postDataStore.load(postDataSource);
    this.postDataStore.state.subscribe(data => {
      this.post = data;
    });

    const commentsShellModel: Array<ShowcaseCommentModel> = [
      new ShowcaseCommentModel(),
      new ShowcaseCommentModel(),
      new ShowcaseCommentModel()
    ];

    const commentsDataSource = this.showcaseService.getDependantDataSourcePostComments(this.postDataStore.state);

    this.commentsDataStore = new DataStore(commentsShellModel);
    // Trigger the loading mechanism (with shell) in the dataStore
    this.commentsDataStore.load(commentsDataSource);

    this.commentsDataStore.state.subscribe(data => {
      this.comments = data;
    });

  }

}
