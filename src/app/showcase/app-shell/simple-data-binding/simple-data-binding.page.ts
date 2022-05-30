import { Component, OnInit } from '@angular/core';
import { Observable, interval, timer } from 'rxjs';
import { takeUntil, finalize, take } from 'rxjs/operators';

import { ShowcaseShellModel } from '../../showcase-shell.model';
import { ShowcaseService } from '../../showcase.service';

@Component({
  selector: 'app-simple-data-binding',
  templateUrl: './simple-data-binding.page.html',
  styleUrls: ['./simple-data-binding.page.scss'],
})
export class SimpleDataBindingPage implements OnInit {
  // We will manually fetch data using the HttpClient and assign it to this property
  simpleFetchData: ShowcaseShellModel;

  // Aux properties for the Simple Fetch (HttpClient) showcase
  simpleFetchButtonDisabled = true;
  simpleFetchCountdown = 0;
  simpleFetchInterval: Observable<any>;

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit() {
    this.showcaseShellSimpleFetch(10);
  }

  showcaseShellSimpleFetch(countdown: number): void {
    // Assign an (empty / null) value to the shell object to restore it's 'loading' state
    this.simpleFetchData = null;

    // Prevent rage clicks on the 'Fetch more Data' button
    this.simpleFetchButtonDisabled = true;

    // Start a countdown and an interval before executing the fetch function
    this.simpleFetchCountdown = countdown;
    this.simpleFetchInterval = interval(1000);

    // Start a countdown to showcase the shell elements animations for a few seconds before the data get's fetched into the shell object
    const timer$ = timer(countdown * 1000);
    // When timer emits after X seconds, complete source
    this.simpleFetchInterval
    .pipe(
      takeUntil(timer$),
      finalize(() => this.simpleFetchButtonDisabled = false)
    )
    .subscribe({
      next: () => {
        this.simpleFetchCountdown --;
      },
      complete: () => {
        this.simpleFetchCountdown = 0;
        // Once the countdown ends, fetch data using the HttpClient
        this.showcaseService.getSimpleDataSource()
        .pipe(
          take(1) // Force Observable to complete
        ).subscribe(val => {
          console.log('Fetching shell data using the HttpClient', val);
          this.simpleFetchData = val;
        });
      }
    });
  }
}
