import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { Observable, of, forkJoin, throwError, combineLatest } from 'rxjs';
import { map, concatMap, first, filter } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { DataStore, ShellModel } from '../../shell/data-store';
import { FirebaseListingItemModel } from './../crud/listing/firebase-listing.model';
import { FirebaseCombinedUserModel, FirebaseSkillModel, FirebaseUserModel } from './../crud/user/firebase-user.model';
import { UserImageModel } from './../crud/user/select-image/user-image.model';
import { TransferStateHelper } from '../../utils/transfer-state-helper';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class FirebaseCrudService {
  // Listing Page
  private listingDataStore: DataStore<Array<FirebaseListingItemModel>>;
  // User Details Page
  private combinedUserDataStore: DataStore<FirebaseCombinedUserModel>;
  private relatedUsersDataStore: DataStore<Array<FirebaseListingItemModel>>;
  // Select User Image Modal
  private avatarsDataStore: DataStore<Array<UserImageModel>>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transferStateHelper: TransferStateHelper,
    private afs: AngularFirestore
  ) {}

  /*
    Firebase User Listing Page
  */
  public getListingDataSource(): Observable<Array<FirebaseListingItemModel>> {
    const rawDataSource = this.afs.collection<FirebaseListingItemModel>('users').valueChanges({ idField: 'id' })
     .pipe(
       map(actions => actions.map(user => {
          const age = this.calcUserAge(user.birthdate);
          return { age, ...user } as FirebaseListingItemModel;
        })
      )
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('firebase-listing-state', rawDataSource);

    return cachedDataSource;
  }

  public getListingStore(dataSource: Observable<Array<FirebaseListingItemModel>>): DataStore<Array<FirebaseListingItemModel>> {
    // Use cache if available
    if (!this.listingDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: Array<FirebaseListingItemModel> = [
        new FirebaseListingItemModel(),
        new FirebaseListingItemModel(),
        new FirebaseListingItemModel(),
        new FirebaseListingItemModel(),
        new FirebaseListingItemModel(),
        new FirebaseListingItemModel()
      ];
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

  // Filter users by age
  public searchUsersByAge(lower: number, upper: number): Observable<Array<FirebaseListingItemModel>> {
    // we save the dateOfBirth in our DB so we need to calc the min and max dates valid for this query
    const minDate = (dayjs(Date.now()).subtract(upper, 'year')).unix();
    const maxDate =  (dayjs(Date.now()).subtract(lower, 'year')).unix();

    const listingCollection = this.afs.collection<FirebaseListingItemModel>('users', ref =>
      ref.orderBy('birthdate').startAt(minDate).endAt(maxDate));

    return listingCollection.valueChanges({ idField: 'id' }).pipe(
      map(actions => actions.map(user => {
         const age = this.calcUserAge(user.birthdate);
         return { age, ...user } as FirebaseListingItemModel;
       })
     ));
  }

  /*
    Firebase User Details Page
  */
  // Concat the userData with the details of the userSkills (from the skills collection)
  public getCombinedUserDataSource(userId: string): Observable<FirebaseCombinedUserModel> {
    const rawDataSource = this.getUser(userId)
    .pipe(
      // Transformation operator: Map each source value (user) to an Observable (combineDataSources | throwError) which
      // is merged in the output Observable
      concatMap(user => {
        if (user && user.skills) {
          // Map each skill id and get the skill data as an Observable
          const userSkillsObservables: Array<Observable<FirebaseSkillModel>> = user.skills.map(skill => {
            return this.getSkill(skill).pipe(first());
          });

          // Combination operator: Take the most recent value from both input sources (of(user) & forkJoin(userSkillsObservables)),
          // and transform those emitted values into one value ([userDetails, userSkills])
          return combineLatest([
            of(user),
            forkJoin(userSkillsObservables)
          ]).pipe(
            map(([userDetails, userSkills]: [FirebaseUserModel, Array<FirebaseSkillModel>]) => {
              // Spread operator (see: https://dev.to/napoleon039/how-to-use-the-spread-and-rest-operator-4jbb)
              return {
                ...userDetails,
                skills: userSkills
              } as FirebaseCombinedUserModel;
            })
          );
        } else {
          // Throw error
          return throwError('User does not have any skills.');
        }
      })
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState(`firebase-user-${userId}-state`, rawDataSource);

    return cachedDataSource;
  }

  public getCombinedUserStore(dataSource: Observable<FirebaseCombinedUserModel>): DataStore<FirebaseCombinedUserModel> {
    // Initialize the model specifying that it is a shell model
    const shellModel: FirebaseCombinedUserModel = new FirebaseCombinedUserModel();
    this.combinedUserDataStore = new DataStore(shellModel);

    // If running in the server, then don't add shell to the Data Store
    // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
    if (isPlatformServer(this.platformId) || dataSource['ssr_state']) {
      // Trigger loading mechanism with 0 delay (this will prevent the shell to be shown)
      this.combinedUserDataStore.load(dataSource, 0);
    } else { // On browser transitions
      // Trigger the loading mechanism (with shell)
      this.combinedUserDataStore.load(dataSource);
    }

    return this.combinedUserDataStore;
  }

  // eslint-disable-next-line max-len
  public getRelatedUsersDataSource(combinedUserDataSource: Observable<FirebaseCombinedUserModel & ShellModel>, userId: string): Observable<Array<FirebaseListingItemModel>>  {
    const rawDataSource = combinedUserDataSource
    .pipe(
      // Filter user values that are not shells. We need to add this filter if using the combinedUserDataStore timeline
      filter(user => !user.isShell),
      concatMap(user => {
        if (user && user.skills) {
          // Get all users with at least 1 skill in common
          const relatedUsersObservable: Observable<Array<FirebaseListingItemModel>> =
          this.getUsersWithSameSkill(user.id, user.skills);

          return relatedUsersObservable;
        } else {
          // Throw error
          return throwError('Could not get related user');
        }
      })
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState(`firebase-user-${userId}-related-users-state`, rawDataSource);

    return cachedDataSource;
  }

  public getRelatedUsersStore(dataSource: Observable<Array<FirebaseListingItemModel>>): DataStore<Array<FirebaseListingItemModel>> {
    // Initialize the model specifying that it is a shell model
    const shellModel: Array<FirebaseListingItemModel> = [
      new FirebaseListingItemModel(),
      new FirebaseListingItemModel(),
      new FirebaseListingItemModel()
    ];
    this.relatedUsersDataStore = new DataStore(shellModel);

    // If running in the server, then don't add shell to the Data Store
    // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
    if (isPlatformServer(this.platformId) || dataSource['ssr_state']) {
      // Trigger loading mechanism with 0 delay (this will prevent the shell to be shown)
      this.relatedUsersDataStore.load(dataSource, 0);
    } else { // On browser transitions
      // Trigger the loading mechanism (with shell)
      this.relatedUsersDataStore.load(dataSource);
    }

    return this.relatedUsersDataStore;
  }

  /*
    Firebase Create User Modal
  */
  public createUser(userData: FirebaseUserModel): Promise<DocumentReference>  {
    // remove isShell property so it doesn't get stored in Firebase
    const { isShell, ...userDataToSave } = userData;
    return this.afs.collection('users').add({...userDataToSave});
  }

  /*
    Firebase Update User Modal
  */
  public updateUser(userData: FirebaseUserModel): Promise<void> {
    // remove isShell property so it doesn't get stored in Firebase
    const { isShell, ...userDataToSave } = userData;
    return this.afs.collection('users').doc(userData.id).set({...userDataToSave});
  }

  public deleteUser(userKey: string): Promise<void> {
    return this.afs.collection('users').doc(userKey).delete();
  }

  /*
    Firebase Select User Image Modal
  */
  public getAvatarsDataSource(): Observable<Array<UserImageModel>> {
    return this.afs.collection<UserImageModel>('avatars').valueChanges();
  }

  public getAvatarsStore(dataSource: Observable<Array<UserImageModel>>): DataStore<Array<UserImageModel>> {
    // Use cache if available
    if (!this.avatarsDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: Array<UserImageModel> = [
        new UserImageModel(),
        new UserImageModel(),
        new UserImageModel(),
        new UserImageModel(),
        new UserImageModel()
      ];

      this.avatarsDataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.avatarsDataStore.load(dataSource);
    }
    return this.avatarsDataStore;
  }

  /*
    FireStore utility methods
  */
  // Get list of all available Skills (used in the create and update modals)
  public getSkills(): Observable<Array<FirebaseSkillModel>> {
    return this.afs.collection<FirebaseSkillModel>('skills').valueChanges({ idField: 'id' });
  }

  // Get data of a specific Skill
  private getSkill(skillId: string): Observable<FirebaseSkillModel> {
    return this.afs.doc<FirebaseSkillModel>('skills/' + skillId)
    .snapshotChanges()
    .pipe(
      map(a => {
        const data = a.payload.data();
        const id = a.payload.id;
        return { id, ...data } as FirebaseSkillModel;
      })
    );
  }


  // Get data of a specific User
  private getUser(userId: string): Observable<FirebaseUserModel> {
    return this.afs.doc<FirebaseUserModel>('users/' + userId)
    .snapshotChanges()
    .pipe(
      map(a => {
        const userData = a.payload.data();
        const id = a.payload.id;
        const age = userData ? this.calcUserAge(userData.birthdate) : 0;
        return { id, age, ...userData } as FirebaseUserModel;
      })
    );
  }

  // Get all users who share at least 1 skill of the user's 'skills' list
  private getUsersWithSameSkill(userId: string, skills: Array<FirebaseSkillModel>): Observable<Array<FirebaseListingItemModel>> {
    // Get the users who have at least 1 skill in common
    // Because firestore doesn't have a logical 'OR' operator we need to create multiple queries, one for each skill from the 'skills' list
    const queries = skills.map(skill => {
      return this.afs.collection('users', ref => ref
      .where('skills', 'array-contains', skill.id))
      .valueChanges({ idField: 'id' });
    });

    // Combine all these queries
    return combineLatest(queries).pipe(
      map((relatedUsers: FirebaseListingItemModel[][]) => {
        // Flatten the array of arrays of FirebaseListingItemModel
        const flattenedRelatedUsers = ([] as FirebaseListingItemModel[]).concat(...relatedUsers);

        // Removes duplicates from the array of FirebaseListingItemModel objects.
        // Also remove the original user (userId)
        const filteredRelatedUsers = flattenedRelatedUsers
        .reduce((accumulatedUsers, user) => {
          if ((accumulatedUsers.findIndex(accumulatedUser => accumulatedUser.id === user.id) < 0) && (user.id !== userId)) {
            return [...accumulatedUsers, user];
          } else {
            // If the user doesn't pass the test, then don't add it to the filtered users array
            return accumulatedUsers;
          }
        }, ([] as FirebaseListingItemModel[]));

        return filteredRelatedUsers;
      })
    );
  }

  private calcUserAge(dateOfBirth: number): number {
    return dayjs(Date.now()).diff(dayjs.unix(dateOfBirth), 'year');
  }
}
