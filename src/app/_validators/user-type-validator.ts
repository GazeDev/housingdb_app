import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function UserTypeValidator(control: AbstractControl): ValidationErrors | null {

  // Don't validate empty control
  if (control.value == '' || control.value == null) {
    return null;
  }

  if (
    control.value == 'tenant' ||
    control.value == 'landlord' ||
    control.value == 'other'
  ) {
    return null;
  }

  return {'userType': true};

}
