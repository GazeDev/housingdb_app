import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";
import * as libphonenumber from 'google-libphonenumber';

export function PhoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  const PNF = libphonenumber.PhoneNumberFormat;
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  console.log('value', control.value);
  // Don't validate empty control
  if (control.value == '') {
    return null;
  }

  let number;
  try {
    number = phoneUtil.parse(control.value, "US");
  } catch (e) {
    return {'phone': true};
  }

  let isValid = phoneUtil.isValidNumber(number);
  console.log('isValid', isValid);
  if (isValid) {
    return null;
  }

  return {'phone': true};

}
