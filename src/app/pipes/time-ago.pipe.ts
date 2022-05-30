import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

@Pipe({ name: 'appTimeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): string {
    dayjs.extend(relativeTime);
    let timeAgo = '';

    if (value) {
      const withoutSuffix = (dayjs(value).diff(dayjs(), 'day') < 0) ? false : true;
      timeAgo = dayjs().to(dayjs(value), withoutSuffix);
    }

    return timeAgo;
  }
}
