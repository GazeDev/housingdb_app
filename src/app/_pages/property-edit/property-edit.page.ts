import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { AuthenticationService } from '_services/index';
import { NumberRangeValidator, NumberRangeItemValidator } from '_validators/range-validator';
import { UrlValidator } from '_validators/url-validator';
import { emptyish } from '_helpers/emptyish';

@Component({
  selector: 'property-edit-page',
  templateUrl: './property-edit.page.html',
  styleUrls: ['/property-edit.page.scss']
})
export class PropertyEditPage {
  public propertyId: string;
  public propertyResponse: any;
  public property: any;
  public landlord: any;

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
    this.propertyResponse = {};
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      address: [{value: '', disabled: true}, Validators.compose([Validators.required])],
      landlordName: [{value: '', disabled: true}],
      // TODO: NEED TO RE-IMPLEMENT LANDLORD INFO/CONNECTION
      landlordQuickInfo: [''],
      // claimOwnership: [false],
      name: [''],
      bedrooms: this.formBuilder.group({
        min: ['', this.bedroomItemValidator()],
        max: ['', this.bedroomItemValidator()],
      }, {
        validator: NumberRangeValidator
      }),
      bathrooms: this.formBuilder.group({
        min: ['', this.bathroomItemValidator()],
        max: ['', this.bathroomItemValidator()],
      }, {
        validator: NumberRangeValidator
      }),
      website: ['', UrlValidator],
      contact: [''],
      body: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('id');
      this.getProperty();
    });
  }

  getProperty() {
    this.apiService.getProperty(this.propertyId).subscribe(res => {
      this.propertyResponse = res;
      this.property = this.propertyMapApiToLocal(res);
      this.form.patchValue(
        this.property
      );
      if (res.LandlordId) {
        this.getLandlord(res.LandlordId);
      }
    },
    err => {
      console.log('error getting property', err);
    });
  }

  extractAddress(property: any) {
    if (property.PostalAddresses) {
      let addr = property.PostalAddresses[0];
      return `${addr.streetAddress}, ${addr.addressLocality}, ${addr.addressRegion} ${addr.postalCode}`;
    } else {
      return '';
    }
  }

  getLandlord(landlordId) {
    this.apiService.getLandlord(landlordId).subscribe(res => {
      this.landlord = res;
      this.form.patchValue({
        landlordName: this.landlord.name,
      });
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
      console.log(this.form);
      // console.log(this.form.errors);
      // console.log(this.form.controls.bedrooms.errors);
      console.log(
        this.form.get('bedrooms.min').dirty, this.form.get('bedrooms.min').touched, this.form.get('bedrooms.min').invalid
      );
      return;
    }

    let formValues = this.form.value;

    let property = this.propertyMapLocalToApi(formValues);
    console.log(
      'diff',
      property,
      this.propertyResponse,
    );
    property = this.isolateChangedValues(property, this.propertyResponse);
    console.log('result', property);
    this.patchProperty(property);
    if (
      !this.propertyResponse.LandlordId &&
      this.form.value.landlordQuickInfo
    ) {
      this.apiService.addLandlord({quickInfo: this.form.value.landlordQuickInfo}).subscribe(
        landlordRequestResponse => {
          let landlordResponse = landlordRequestResponse.body;
          this.apiService.addLandlordToProperty(this.propertyId, landlordResponse.id).subscribe(updateResponse => {

            this.displayPropertyCreatedToast(this.propertyId);
            this.resetForm();
          });
        },
        landlordErrorResponse => {
          let contentLocation = landlordErrorResponse.headers.get('Content-Location');
          if (landlordErrorResponse.status === 422 && contentLocation) {
            // landlord already exists and we should use that id to attach to our property
            this.apiService.addLandlordToProperty(this.propertyId, contentLocation).subscribe(updateResponse => {

              this.displayPropertyCreatedToast(this.propertyId);
              this.resetForm();
            });
          }
        }
      );
    }
  }

  patchProperty(property) {
    this.apiService.patchProperty(this.propertyId, property).subscribe(propertyResponse => {
      this.displayPropertyCreatedToast(this.propertyId);
      this.resetForm();
    },
    err => {
      if (err.status == 422) {
        console.log('err', err);
        this.alertService.action({
          data: {
            message: err.error.message,
          }
        });
      }
    });
  }

  resetForm() {
    this.getProperty();
  }

  displayPropertyCreatedToast(propertyId) {
    this.alertService.action({
      data: {
        message: 'The property has been updated.',
        action: {
          text: 'View Property',
          navigateTo: `/property/${propertyId}`,
        },
      }
    });
  }
  /*
    Take obj1, iterate, return the key/values that are different from obj2
   */
  isolateChangedValues(obj1, obj2) {
    console.log('objects', obj1, obj2);
    let returnedObj = {};
    for (let [key, value] of Object.entries(obj1)) {
      if (!obj2.hasOwnProperty(key) || (value !== obj2[key])) {
        returnedObj[key] = value;
      }
    }
    return returnedObj;
  }

  bathroomItemValidator() {
    return NumberRangeItemValidator({
      modulo: .5,
      min: 1,
      max: 9,
    });
  }

  bedroomItemValidator() {
    return NumberRangeItemValidator({
      modulo: 1,
      min: 0,
      max: 10,
    });
  }

  propertyMapApiToLocal(response) {
    let property: any = {};
    property.name = response.name;
    property.machineName = response.machineName;
    property.address = this.extractAddress(response);
    property.bedrooms = {};
    property.bedrooms.min = response.bedroomsMin;
    property.bedrooms.max = response.bedroomsMax;
    property.bathrooms = {};
    property.bathrooms.min = response.bathroomsMin;
    property.bathrooms.max = response.bathroomsMax;
    property.website = response.website;
    property.contact = response.contact;
    property.body = response.body;
    return property;
  }

  propertyMapLocalToApi(formValues) {
    let property: any = {};
    // let landlord: any = {};
    let landlordQuickInfo: boolean = false;
    for (var key in formValues) {
      console.log(key, formValues[key]);
      // if (
      //   emptyish(formValues[key])
      // ) {
      //   continue;
      // }

      switch (key) {
        case 'claimOwnership':
          // we'll manually check this later and look up account info if checked
          // but we do need to prevent it from being added to property as is
          break;
        case 'landlordQuickInfo':
          // we'll manually check this later and look up account info if checked
          // but we do need to prevent it from being added to property as is
          break;
        case 'bedrooms':
          if (
            !emptyish(formValues.bedrooms.min)
          ) {
            property.bedroomsMin = formValues.bedrooms.min;
            property.bedroomsMax = formValues.bedrooms.max;
          } else {
            property.bedroomsMin = null;
            property.bedroomsMax = null;
          }
          break;
        case 'bathrooms':
          if (
            !emptyish(formValues.bathrooms.min)
          ) {
            property.bathroomsMin = formValues.bathrooms.min;
            property.bathroomsMax = formValues.bathrooms.max;
          } else {
            property.bathroomsMin = null;
            property.bathroomsMax = null;
          }
          break;
        default:
          property[key] = formValues[key];
      }
    }
    return property;
  }

  bedroomValueDuplicate() {
    let minControl = this.form.get('bedrooms.min');
    let maxControl = this.form.get('bedrooms.max');
    if (emptyish(minControl.value)) {
      minControl.setValue(maxControl.value);
    } else if (emptyish(maxControl.value)) {
      maxControl.setValue(minControl.value);
    }
  }

  bedroomValuesSwitch() {
    let minControl = this.form.get('bedrooms.min');
    let maxControl = this.form.get('bedrooms.max');
    let minValue = minControl.value;
    minControl.setValue(maxControl.value);
    maxControl.setValue(minValue);
  }

  bathroomValueDuplicate() {
    let minControl = this.form.get('bathrooms.min');
    let maxControl = this.form.get('bathrooms.max');
    if (emptyish(minControl.value)) {
      minControl.setValue(maxControl.value);
    } else if (emptyish(maxControl.value)) {
      maxControl.setValue(minControl.value);
    }
  }

  bathroomValuesSwitch() {
    let minControl = this.form.get('bathrooms.min');
    let maxControl = this.form.get('bathrooms.max');
    let minValue = minControl.value;
    minControl.setValue(maxControl.value);
    maxControl.setValue(minValue);
  }

}
