import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HousingAvailable } from '_models/housing-available.model';

import { Router } from '@angular/router';
import { ApiService } from '_services/api.service';

import { NumberRangeValidator, NumberRangeItemValidator } from '_validators/range-validator';

// import { AlertService } from '_services/alert.service';
import { AuthenticationService } from '_services/index';
import { UrlValidator } from '_validators/url-validator';
import { emptyish } from '_helpers/emptyish';

@Component({
  selector: 'app-housing-available-add',
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
      bedrooms: [0, this.bedroomItemValidator()], // bed and bath used to be [0];
      bathrooms: [0, Validators.compose([])],
      website: ['', UrlValidator],
      contact: ['', Validators.compose([Validators.required])],
      metadata: [''],
      details: ['']
    });
  }

  async ngOnInit() {
    await this.authService.checkLogin();
  }

  bedroomItemValidator() {
    return NumberRangeItemValidator({
      modulo: 1,
      min: 0,
      max: 10,
    });
  }

  bathroomItemValidator() {
    return NumberRangeItemValidator({
      modulo: .5,
      min: 1,
      max: 9,
    });
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
    let housingAvailable: HousingAvailable = {
      title: formValues.title,
      body: formValues.body,
      contact: formValues.contact,
      status: formValues.status,
      metadata: {},
      address: formValues.address,
      details: {},
      website: formValues.website,
      AuthorId: formValues.AuthorId
    };
    if (formValues.claimOwnership === true) {
      this.apiService.getAccount().subscribe(
        response => {
          housingAvailable.AuthorId = response.id;
          this.apiService.addHousingAvailable(housingAvailable).subscribe(res => {
            console.log("Form submitted");
            for (let key in formValues) {
              console.log(key, formValues[key]);
            }
          });
          this.resetForm();
        }
      )
    }
  }
}
