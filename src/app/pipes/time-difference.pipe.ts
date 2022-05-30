import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs';

@Pipe({ name: 'appTimeDifference' })
export class TimeDifferencePipe implements PipeTransform {
  transform(value: any): number {
    return dayjs(value).diff(dayjs(), 'day');
  }
}
