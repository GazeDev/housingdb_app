import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '_services/api.service';
import { NumberRangeValidator, NumberRangeItemValidator } from '_validators/range-validator';
import { UrlValidator } from '_validators/url-validator';
import { HousingAvailable } from '_models/housing-available.model';

import { AuthenticationService } from '_services/index';


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
      bedrooms: ['', this.bedroomItemValidator()],
      bathrooms: ['', this.bathroomItemValidator()],
      website: ['', UrlValidator],
      contact: ['', Validators.compose([Validators.required])],
      status:['active'],
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
    console.log("Form submitted: ");
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
      address: formValues.address,
      bathrooms: formValues.bathrooms,
      bedrooms: formValues.bedrooms,
      website: formValues.website,
      AuthorId: formValues.AuthorId,
    };
    if (formValues.status !== null) {
      housingAvailable.status = formValues.status;
    }
    this.apiService.getAccount().subscribe(
      accountResponse => {
        housingAvailable.AuthorId = accountResponse.id;
        this.apiService.addHousingAvailable(housingAvailable).subscribe(addHousingAvailableResponse => {
          this.resetForm();
        });
      }
    )
  }
}
