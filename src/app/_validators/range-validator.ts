import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function NumberRangeValidator(group: AbstractControl): ValidationErrors | null {
  let minControlValue = group.get('min').value;
  let maxControlValue = group.get('max').value;

  // If neither value is set we don't need to do anything
  if (minControlValue === '' && maxControlValue === '') {
    return null;
  }

  // If only one value is set, the user needs to set the other one
  if (
    (minControlValue === '' && maxControlValue !== '') ||
    (minControlValue !== '' && maxControlValue === '')
  ) {
    return {'incompleteSetError': {message: `"${minControlValue}", "${maxControlValue}"`}};
  }

  let minValue = Number.parseFloat(minControlValue);
  let maxValue = Number.parseFloat(maxControlValue);

  if (maxValue < minValue) {
    return {'outOfOrderError': {message: `${maxValue} < ${minValue}`}};
  }

  return null;

}
/*
  typeError
  belowMinError
  aboveMaxError
  badMultipleError
  nonSimpleNumberError
*/
export function NumberRangeItemValidator( config = {modulo: 1, min: 0, max: 10}): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    let min = config.min;
    let max = config.max;

    let controlValue = control.value;
    console.log(controlValue);

    if (controlValue === '') {
      return null;
    }

    // make sure it's a number once converted from string
    if (Number.isNaN(Number.parseFloat(controlValue))) {
      return {'typeError': {message: "Value entered should be a number."}};
    }

    let value = Number.parseFloat(controlValue);

    if (value < min) {
      console.log('evaluating min', value, '<', min);
      return {'belowMinError': {message: "Value entered should be equal or greater than the minimum value."}};
    }

    if (value > max) {
      console.log('evaluating max', value, '>', max);
      return {'aboveMaxError': {message: "Value entered should be equal or less than the maximum value."}};
    }

    if (config.modulo !== 0 && value % config.modulo !== 0) {
      console.log(controlValue, value, value % config.modulo);
      return {'badMultipleError': {message: "Value entered must be a valid multiple."}};
    }

    let simpleNumberRegex = /^[0-9]*\.?[0-9]*$/;
    if (!simpleNumberRegex.test(controlValue)) {
      return {'nonSimpleNumberError': {message: "Value entered should be a simple number."}};
    }

    return null;

  }
}
