import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { AuthenticationService } from '_services/index';
import { LandlordInfoValidator } from '_validators/landlord-info-validator';
import { PhoneNumberValidator } from '_validators/phone-number-validator';
import { UrlValidator } from '_validators/url-validator';
import { Landlord } from '_models/landlord.model';

@Component({
  selector: 'landlord-edit-page',
  templateUrl: './landlord-edit.page.html',
  styleUrls: ['./landlord-edit.page.scss'],
})
export class LandlordEditPage implements OnInit {
  public landlordId: string;
  public landlord: Landlord;

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;
  account: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    public authService: AuthenticationService,
  ) {
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      name: [{value: '', disabled: true}, Validators.required],
      phone: ['', PhoneNumberValidator],
      email: ['', Validators.email],
      website: ['', UrlValidator],
      body: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.landlordId = params.get('id');
      this.getLandlord();
    });
  }

  getLandlord() {
    this.apiService.getLandlord(this.landlordId).subscribe(res => {
      this.landlord = res;
      this.form.patchValue(
        this.landlord
      );
    },
    err => {
      console.log('error getting landlord', err);
    });
  }

  submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;

    if (!this.form.valid) {
      console.log('form invalid!');
      return;
    }

    let formValues = this.form.value;
    let landlord: any = {};
    landlord = this.isolateChangedValues(formValues, this.landlord);
    this.patchLandlord(landlord);
  }

  patchLandlord(landlord) {
    this.apiService.patchLandlord(this.landlordId, landlord).subscribe(landlordResponse => {
      this.displayLandlordCreatedToast(this.landlordId);
      this.resetForm();
    },
    err => {
      if (err.status == 422) {
        this.alertService.action({
          data: {
            message: 'A landlord with that name, phone, or email already exists.',
          }
        });
      }
    });
  }

  resetForm() {
    this.getLandlord();
  }

  displayLandlordCreatedToast(landlordId) {
    this.alertService.action({
      data: {
        message: 'The landlord has been updated.',
        action: {
          text: 'View Landlord',
          navigateTo: `/landlord/${landlordId}`,
        },
      }
    });
  }
  /*
    Take obj1, iterate, return the key/values that are different from obj2
   */
  isolateChangedValues(obj1, obj2) {
    let returnedObj = {};
    for (let [key, value] of Object.entries(obj1)) {
      if (!obj2.hasOwnProperty(key) || (value !== obj2[key])) {
        returnedObj[key] = value;
      }
    }
    return returnedObj;
  }

}
