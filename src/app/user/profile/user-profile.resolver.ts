import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { UserService } from '../user.service';
import { UserProfileModel } from './user-profile.model';

@Injectable()
export class UserProfileResolver implements Resolve<DataStore<UserProfileModel>> {

  constructor(private userService: UserService) { }

  resolve(): DataStore<UserProfileModel> {
    const dataSource: Observable<UserProfileModel> = this.userService.getProfileDataSource();
    const dataStore: DataStore<UserProfileModel> = this.userService.getProfileStore(dataSource);

    return dataStore;
  }
}
