import { FormControl } from '@angular/forms';

export class UsernameValidator {

  static usernameNotAvailable(fc: FormControl) {

    // this is a dummy validator to check if the username is valid or not.
    // In a real app you should check against your DB if the username is already in use.
    // in this example we define two existing usernames: 'abc123' and '123abc'
    // If our validation fails, we return an object with a key for the error name and a value of true.
    // Otherwise, if the validation passes, we simply return null because there is no error.

    if (fc.value.toLowerCase() === 'abc123' || fc.value.toLowerCase() === '123abc') {
      return {
        usernameNotAvailable: true
      };
    } else {
      return null;
    }
  }
}
