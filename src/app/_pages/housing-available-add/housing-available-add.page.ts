import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HousingAvailable } from '_models/housing-available.model';
import { Router } from '@angular/router';
import { ApiService } from '_services/api.service';
// import { AlertService } from '_services/alert.service';
import { AuthenticationService } from '_services/index';
// import { NumberRangeValidator, NumberRangeItemValidator } from '_validators/range-validator';
import { UrlValidator } from '_validators/url-validator';
// import { emptyish } from '_helpers/emptyish';

@Component({
  selector: 'housing-available-add',  // Need 'app-' at beginnning? What does that do?
  templateUrl: './housing-available-add.page.html',
  styleUrls: ['./housing-available-add.page.scss'],
})
export class HousingAvailableAddPage implements OnInit {

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public authService: AuthenticationService,
  ) {
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      body: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      bedrooms: [0],
      bathrooms: [0],
      website: ['', UrlValidator],
      contact: ['', Validators.compose([Validators.required])],
    });
  }

  async ngOnInit() {
    await this.authService.checkLogin();
  }

  resetForm() {
    this.form.reset();
    this.formDirective.resetForm();
  }

  submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;

    if (!this.form.valid) {
      console.log('form invalid!');
      console.log(this.form);
      return;
    }
    let formValues = this.form.value;
    this.apiService.addHousingAvailable(formValues).subscribe(res => {
      console.log("Form submitted", res);
     });
    this.resetForm();
  }

}
