import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ShowcaseService } from '../../showcase.service';
import { ShowcaseShellModel } from '../../showcase-shell.model';
import { Observable } from 'rxjs';
import { DataStore } from '../../../shell/data-store';

@Injectable()
export class ProgressiveShellResolver implements Resolve<any> {

  constructor(private showcaseService: ShowcaseService) {}

  resolve() {
    const dataSource: Observable<ShowcaseShellModel> = this.showcaseService.getDataSourceWithDelay();
    const dataStore: DataStore<ShowcaseShellModel> = this.showcaseService.getSimpleDataStore(dataSource);

    return dataStore;
  }
}
