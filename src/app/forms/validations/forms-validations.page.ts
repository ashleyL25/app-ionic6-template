import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { UsernameValidator } from '../../validators/username.validator';
import { PasswordValidator } from '../../validators/password.validator';
import { PhoneValidator } from '../../validators/phone.validator';

import { counterRangeValidator } from '../../components/counter-input/counter-input.component';
import { CountryPhone } from './country-phone.model';

@Component({
  selector: 'app-forms-validations-page',
  templateUrl: './forms-validations.page.html',
  styleUrls: [
    './styles/forms-validations.page.scss'
  ]
})
export class FormsValidationsPage implements OnInit {

  validationsForm: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;
  genders: Array<string>;

  validations = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'usernameNotAvailable', message: 'Your username is already taken.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'invalidCountryPhone', message: 'Phone is incorrect for the selected country.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Password confirmation is required.' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ],
    'guests': [
      { type: 'rangeError', message: 'Number must be between: ' }
    ],
    'bedrooms': [
      { type: 'rangeError', message: 'Number must be between: ' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.
    this.countries = [
      new CountryPhone('UY', 'Uruguay'),
      new CountryPhone('US', 'United States'),
      new CountryPhone('ES', 'España'),
      new CountryPhone('BR', 'Brasil'),
      new CountryPhone('FR', 'France')
    ];

    this.genders = [
      'Female',
      'Male',
      'Other'
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    const country = new FormControl(this.countries[0], Validators.required);

    const phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.invalidCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.validationsForm = new FormGroup({
      'username': new FormControl('', Validators.compose([
        UsernameValidator.usernameNotAvailable,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      'name': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'gender': new FormControl(this.genders[0], Validators.required),
      'country_phone': this.country_phone_group,
      'matching_passwords': this.matching_passwords_group,
      'guests': new FormControl(6, counterRangeValidator(1, 12)),
      'bedrooms': new FormControl(3, counterRangeValidator(1, 5)),
      'terms': new FormControl(true, Validators.pattern('true'))
    });
  }

  onSubmit(values) {
    console.log(values);
  }
}
