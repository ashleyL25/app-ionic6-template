import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Observable, Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as dayjs from 'dayjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: [
    './countdown-timer.component.scss'
  ]
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  _endingTime: any;
  _initialUnit = 'hour';
  _endingUnit = 'second';

  _updateInterval: Observable<any> = interval(1000);
  private _unsubscribeSubject: Subject<void> = new Subject();

  _daysLeft: number;
  _hoursLeft: number;
  _minutesLeft: number;
  _secondsLeft: number;

  // DIVISORS
  // 60 seconds * 60 (minutes) * 24 (hours) = 86400 seconds = 1 day
  _dayDivisor = (60 * 60 * 24);
  // 60 seconds * 60 (minutes) = 3600 seconds = 1 hour
  _hourDivisor = (60 * 60);
  // 60 seconds = 1 minute
  _minuteDivisor = 60;
  _secondDivisor = 1;

  // MODULUS
  // Neutral modulus
  _dayModulus = (secondsLeft) => secondsLeft;
  // The modulus operator (%) returns the division remainder.
  // To figure out how many hours are left after taking in consideration the days, we should do:
  //    (secondsLeft % hourModulus) / hourDivisor
  // In 1 day there are 86400 seconds, and in 1 hour 3600 seconds. 1 day + 1 hour = 90000 seconds
  //    (90000s % 86400s) / 3600s = 1h
  _hourModulus = (secondsLeft) => (secondsLeft % this._dayDivisor);
  _minuteModulus = (secondsLeft) => (secondsLeft % this._hourDivisor);
  _secondModulus = (secondsLeft) => (secondsLeft % this._minuteDivisor);

  @Input()
  set end(endingTime: string) {
    this._endingTime = (endingTime !== undefined && endingTime !== null) ? dayjs(endingTime) : dayjs();
  }

  @Input()
  set units(units: {from: string, to: string}) {
    // 'day', 'hour, 'minute', 'second'
    this._initialUnit = (units !== undefined && (units.from !== undefined && units.from !== null)) ? units.from : 'hour';
    this._endingUnit = (units !== undefined && (units.to !== undefined && units.to !== null)) ? units.to : 'second';

    // For 'day' unit, use the default modulus

    // Adjust modulus depending on the unit
    if (this._initialUnit === 'hour') {
      // Cancelation modulus
      this._dayModulus = (secondsLeft) => 1;
      // Neutral modulus
      this._hourModulus = (secondsLeft) => secondsLeft;
    }

    if (this._initialUnit === 'minute') {
      // Cancelation modulus
      this._dayModulus = (secondsLeft) => 1;
      this._hourModulus = (secondsLeft) => 1;
      // Neutral modulus
      this._minuteModulus = (secondsLeft) => secondsLeft;
    }

    if (this._initialUnit === 'second') {
      // Cancelation modulus
      this._dayModulus = (secondsLeft) => 1;
      this._hourModulus = (secondsLeft) => 1;
      this._minuteModulus = (secondsLeft) => 1;
      // Neutral modulus
      this._secondModulus = (secondsLeft) => secondsLeft;
    }
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) { }

  ngOnInit(): void {
    // I believe if we run this on SSR, it won't ever trigger the change detection and thus the server will be stuck loading
    if (isPlatformBrowser(this.platformId)) {
      this._updateInterval.pipe(takeUntil(this._unsubscribeSubject)).subscribe(
        (val) => {
          this.updateValues();
        },
        (error) => console.error(error),
        () => console.log('[takeUntil] complete')
      );
    } else {
      this.updateValues();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeSubject.next();
    this._unsubscribeSubject.complete();
  }

  updateValues(): void {
    const secondsLeft = this._endingTime.diff(dayjs(), 'second');

    this._daysLeft = Math.floor(this._dayModulus(secondsLeft) / this._dayDivisor);
    this._hoursLeft = Math.floor(this._hourModulus(secondsLeft) / this._hourDivisor);
    this._minutesLeft = Math.floor(this._minuteModulus(secondsLeft) / this._minuteDivisor);
    this._secondsLeft = Math.floor(this._secondModulus(secondsLeft) / this._secondDivisor);
  }
}
