import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function UrlValidator(control: AbstractControl): ValidationErrors | null {

  // Don't validate empty control
  if (control.value == '' || control.value == null) {
    return null;
  }

  // Copyright (c) 2010-2018 Diego Perini (http://www.iport.it)
  // License: MIT
  // https://gist.github.com/dperini/729294
  // Modified to not accept ftp, and to require protocol
  // Regex with matching and non-matching: https://regexr.com/4lneh
  let urlRegex = /^(?:(?:(?:https?):)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9_]-*)*[a-z\u00a1-\uffff0-9_]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9_]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/;

  let regexp = new RegExp(urlRegex, 'i');

  let valid = regexp.test(control.value);

  if (valid) {
    return null;
  }

  return {'url': true};

}
