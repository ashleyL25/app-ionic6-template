import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { counterRangeValidator } from '../../components/counter-input/counter-input.component';

@Component({
  selector: 'app-forms-filters-page',
  templateUrl: './forms-filters.page.html',
  styleUrls: [
    './styles/forms-filters.page.scss',
    './styles/forms-filters.ssr.scss'
  ]
})
export class FormsFiltersPage {
  rangeForm: any;
  checkboxForm: FormGroup;
  radioForm: FormGroup;
  checkboxTagsForm: FormGroup;
  radioTagsForm: FormGroup;
  switchersForm: FormGroup;
  counterForm: any;
  ratingForm: FormGroup;
  radioColorForm: FormGroup;

  constructor() {
    this.rangeForm = new FormGroup({
      single: new FormControl(25),
      dual: new FormControl({lower: 12, upper: 23})
    });

    this.checkboxForm = new FormGroup({
      person_1: new FormControl(true),
      person_2: new FormControl(false),
      person_3: new FormControl(false),
      person_4: new FormControl(true),
      person_5: new FormControl(false)
    });

    this.radioForm = new FormGroup({
      selected_option: new FormControl('apple')
    });

    this.checkboxTagsForm = new FormGroup({
      tag_1: new FormControl(true),
      tag_2: new FormControl(false),
      tag_3: new FormControl(true),
      tag_4: new FormControl(true),
      tag_5: new FormControl(false),
      tag_6: new FormControl(false),
      tag_7: new FormControl({value: true, disabled: true}),
      tag_8: new FormControl(false)
    });

    this.radioTagsForm = new FormGroup({
      selected_option: new FormControl('any')
    });

    this.switchersForm = new FormGroup({
      notifications: new FormControl(true),
      email_notifications: new FormControl(false)
    });

    this.counterForm = new FormGroup({
      counter: new FormControl(5, counterRangeValidator(1, 7)),
      counter2: new FormControl(2, counterRangeValidator(1, 5))
    });

    this.ratingForm = new FormGroup({
      rate: new FormControl(2.5),
      rate2: new FormControl(1.5)
    });

    this.radioColorForm = new FormGroup({
      selected_color: new FormControl('#fc9961')
    });
  }

  rangeChange(range: Range) {
    console.log('range change', range);
  }
}
