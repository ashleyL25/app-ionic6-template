import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, combineLatest, of, forkJoin, ReplaySubject, merge } from 'rxjs';
import { delay, finalize, tap, map, filter, concatMap } from 'rxjs/operators';
// eslint-disable-next-line max-len
import { ShowcaseShellModel, ShowcasePostModel, ShowcaseCommentModel, ShowcaseCombinedTaskUserModel, ShowcaseUser2Model, ShowcaseTaskModel, ShowcaseShellUserModel, ShowcaseCompanyModel } from './showcase-shell.model';
import { DataStore, ShellModel } from '../shell/data-store';
import { TravelListingModel } from '../travel/listing/travel-listing.model';
import { FashionListingModel } from '../fashion/listing/fashion-listing.model';

@Injectable()
export class ShowcaseService {
  private showcaseDataStore: DataStore<ShowcaseShellModel>;
  private openDataStream: ReplaySubject<Array<ShowcaseShellUserModel>> = new ReplaySubject<Array<ShowcaseShellUserModel>>();

  constructor(private http: HttpClient) { }

  public getDataSourceWithDelay(): Observable<ShowcaseShellModel> {
    return this.http.get<ShowcaseShellModel>('./assets/sample-data/showcase/shell.json').pipe(
      tap(val => {
        console.log('getData STARTED');
        // eslint-disable-next-line no-console
        console.time('getData Roundtrip');
      }),
      delay(5000),
      finalize(() => {
        console.log('getData COMPLETED');
        // eslint-disable-next-line no-console
        console.timeEnd('getData Roundtrip');
      }));
  }

  public getSimpleDataSource(): Observable<ShowcaseShellModel> {
    return this.http.get<ShowcaseShellModel>('./assets/sample-data/showcase/shell.json');
  }

  public getSimpleDataStore(dataSource: Observable<ShowcaseShellModel>): DataStore<ShowcaseShellModel> {
    // Use cache if available
    if (!this.showcaseDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: ShowcaseShellModel = new ShowcaseShellModel();
      this.showcaseDataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.showcaseDataStore.load(dataSource);
    }
    return this.showcaseDataStore;
  }

  public getListDataSource(): Observable<any> {
    return this.http.get('https://reqres.in/api/users').pipe(map(result => result['data']));
  }

  public getPaginationDataSource(page: number): Observable<any> {
    return this.http.get('https://reqres.in/api/users?page=' + page).pipe(
      map(result => result['data']),
      filter(results => results.length > 0)
    );
  }

  public getMultipleDataSourceA(): Observable<TravelListingModel> {
    return this.http.get<TravelListingModel>('./assets/sample-data/travel/listing.json');
  }

  public getMultipleDataSourceB(): Observable<FashionListingModel> {
      return this.http.get<FashionListingModel>('./assets/sample-data/fashion/listing.json');
  }

  public getDependantDataSourcePost(): Observable<ShowcasePostModel> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts/1');
  }

  // eslint-disable-next-line max-len
  public getDependantDataSourcePostComments(dependantDataSource: Observable<ShowcasePostModel & ShellModel>): Observable<Array<ShowcaseCommentModel>> {
    return dependantDataSource.pipe(
      // Filter user values that are not shells. We need to add this filter if using the combinedUserDataStore timeline
      filter(post => !post.isShell),
      concatMap(post => {
        return this.http.get<any>('https://jsonplaceholder.typicode.com/comments?postId=' + post.id);
      })
    );
  }

  getUser(userId: number): Observable<ShowcaseUser2Model> {
    return this.http.get<ShowcaseUser2Model>('https://jsonplaceholder.typicode.com/users/' + userId);
  }

  // get the company details, a subset of the user data
  getUserSubsetData(userId: number): Observable<ShowcaseCompanyModel> {
    const dataObservable = this.http.get<ShowcaseUser2Model>('https://jsonplaceholder.typicode.com/users/' + userId);

    return dataObservable.pipe(
      map((jsonResponse) => {
        const filteredData: ShowcaseCompanyModel = {
          ...jsonResponse.company
        };
        return filteredData;
      })
    );
  }

  getTasks(): Observable<Array<ShowcaseTaskModel>> {
    return this.http.get<Array<ShowcaseTaskModel>>('https://jsonplaceholder.typicode.com/todos');
  }

  // Concat the task with the details of the user
  public getCombinedTasksUserDataSource(): Observable<Array<ShowcaseCombinedTaskUserModel>> {
    return this.getTasks().pipe(
      concatMap(tasks => {
        const completeTaskData = tasks.map(task => {
          // for each task retrun a new observable with the ShowcaseCombinedTaskUserModel
          const taskUser: Observable<ShowcaseUser2Model> = this.getUser(task.userId);

          return combineLatest([
            of(task),
            taskUser
          ]).pipe(
            map(([taskData, user]: [ShowcaseTaskModel, ShowcaseUser2Model]) => {
              return {
                ...taskData,
                user: user
              } as ShowcaseCombinedTaskUserModel;
            })
          );
        });
        return forkJoin(completeTaskData);
      })
    );
  }

  public getOpenDataStream(): Observable<Array<ShowcaseShellUserModel>> {
    const firstLoadData = this.getPaginationDataSource(1);

    return merge(
      this.openDataStream.asObservable(),
      firstLoadData
    );
  }

  public pushValuesToOpenStream(): void {
    const stackedValues = this.getStackedValues();

    this.openDataStream.next(stackedValues);
  }

  public getStackedValuesDataSource(): Observable<Array<ShowcaseShellUserModel>> {
    const stackedValues = this.getStackedValues();

    return of(stackedValues).pipe(delay(3000));
  }

  public getStackedValues(): Array<ShowcaseShellUserModel> {
    const newUser = {
      first_name: 'Agustin',
      last_name: 'Nitsuga',
      avatar: './assets/sample-images/user/person_1.jpg'
    } as ShowcaseShellUserModel;

    // Get a random integer between 1 (and only 1) and 'max'
    const getRand: (max: number, min?: number) => number = (max, min = 1) => {
      return Math.floor(Math.random() * max) + min;
    };

    // Randomly send one, two or three users
    return Array(getRand(3)).fill(newUser);
  }
}
