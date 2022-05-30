import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsResolver implements Resolve<any> {

  constructor(private notificationsService: NotificationsService) { }

  resolve() {
    // Base Observable (where we get data from)
    const dataObservable: Observable<any> = this.notificationsService.getData();

    return { source: dataObservable };
  }
}
