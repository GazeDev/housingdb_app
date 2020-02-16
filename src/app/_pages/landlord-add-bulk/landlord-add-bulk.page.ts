import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { AuthenticationService } from '_services/index';
import { LandlordInfoValidator } from '_validators/landlord-info-validator';
import { PhoneNumberValidator } from '_validators/phone-number-validator';
import { UrlValidator } from '_validators/url-validator';

@Component({
  selector: 'landlord-add-bulk-page',
  templateUrl: './landlord-add-bulk.page.html',
  styleUrls: ['./landlord-add-bulk.page.scss'],
})
export class LandlordAddBulkPage {

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;

  public landlords: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    public authService: AuthenticationService,
  ) {
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      landlords: ['', Validators.compose([Validators.required])],
    },
    // {
    //   validator: ReviewableValidator(),
    // }
    );
  }

  submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;
    if(!this.form.valid) {
      return;
    }

    let landlords = this.form.get('landlords').value;

    this.landlords = JSON.parse(landlords);

    for (let landlord of this.landlords) {

      this.apiService.addLandlord(landlord).subscribe(landlordResponse => {
        landlord.submitted = true;
        landlord.id = landlordResponse.body.id;
      },
      err => {
        console.log(err);
        landlord.error = err.error ? err.error.message : err;
      });
    }


  }

}
