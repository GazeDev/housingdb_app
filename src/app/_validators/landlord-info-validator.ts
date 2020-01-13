import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function LandlordInfoValidator(nameAvailable: boolean = false): ValidatorFn {

  return (group: AbstractControl): ValidationErrors | null => {
    let quickInfoControl = group.get('landlordQuickInfo');
    let quickInfoValue = quickInfoControl.value;

    let nameControl = group.get('name');
    let nameValue = nameControl.value;

    // quickInfoControl.reset();
    // nameControl.updateValueAndValidity();
    quickInfoControl.setErrors(null);
    quickInfoControl.setErrors(null);
    nameControl.setErrors(null);

    // No errors if at least one is set
    if (quickInfoValue !== '' || nameValue !== '') {
      return null;
    }

    // both empty

    if (nameAvailable) {
      quickInfoControl.setErrors({nameNotSet: true});
      nameControl.setErrors({nameNotSet: true});
      return {'nameNotSet': {message: "landlordQuickInfo empty and Name avaialble but empty. One required"}};
    }
    quickInfoControl.setErrors({landlordQuickInfoNotSet: true});
    return {'landlordQuickInfoNotSet': {message: "landlordQuickInfo empty and required"}};
  }
}
