import { Component } from '@angular/core';

import * as dayjs from 'dayjs';

@Component({
  selector: 'app-showcase-custom-components',
  templateUrl: './custom-components.page.html',
  styleUrls: ['./custom-components.page.scss']
})
export class CustomComponentsPage {
  // Relative date (better to showcase UI micro-interactions)
  countdownDate: string = dayjs().add(1, 'day').add(8, 'hour').add(10, 'second').format('MM/DD/YYYY HH:mm:ss') as string;
  // Instead of hardcoded one
  // countdownDate = '12/01/2018';

  constructor() { }
}
