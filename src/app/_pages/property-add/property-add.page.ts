import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { AuthenticationService } from '_services/index';
import { NumberRangeValidator, NumberRangeItemValidator } from '_validators/range-validator';
import { UrlValidator } from '_validators/url-validator';
import { emptyish } from '_helpers/emptyish';
import { Landlord } from '_models/landlord.model';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.page.html',
  styleUrls: ['./property-add.page.scss'],
})
export class PropertyAddPage implements OnInit {

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;
  landlord: Landlord;
  landlordId: string;
  landlordOptions: Observable<Landlord[]>;

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
      address: ['', Validators.compose([Validators.required])],
      landlordId: [''],
      landlordLookup: [''],
      landlordQuickInfo: [''],
      claimOwnership: [false],
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
    this.form.get('landlordLookup').valueChanges.subscribe(value => {
      this.landlordOptions = this.getLandlordOptions(value);
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

  getLandlordOptions(value: string): Observable<Landlord[]> {
    let results = this.apiService.getLandlords({search: value});
    return results;
  }

  clearLandlord() {
    this.landlord = undefined;
    this.landlordId = undefined;
    this.form.patchValue({
      landlordId: '',
    });
  }

  setSelection(landlord: Landlord) {
    this.landlord = landlord;
    this.landlordId = landlord.id;
    this.form.patchValue({
      landlordId: landlord.id,
    });
  }

  addItem(value: string) {
    this.landlord = true;
    this.apiService.addLandlord({quickInfo: value}).subscribe(
      landlordRequestResponse => {
        let landlordResponse = landlordRequestResponse.body;
        this.setSelection(landlordResponse);
      },
      landlordErrorResponse => {
        let contentLocation = landlordErrorResponse.headers.get('Content-Location');
        if (landlordErrorResponse.status === 422 && contentLocation) {
          // landlord already exists and we should use that id to attach to our property
          this.getLandlord(contentLocation);
        }
      }
    );
  }

  getLandlord(landlordId) {
    this.apiService.getLandlord(landlordId).subscribe(res => {
      this.setSelection(res);
    },
    err => {
      console.log('error getting landlord', err)
    });
  }

  bedroomValueDuplicate() {
    let minControl = this.form.get('bedrooms.min');
    let maxControl = this.form.get('bedrooms.max');
    if (minControl.value === '') {
      minControl.setValue(maxControl.value);
    } else if (maxControl.value === '') {
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

  bathroomItemValidator() {
    return NumberRangeItemValidator({
      modulo: .5,
      min: 1,
      max: 9,
    });
  }

  bathroomValueDuplicate() {
    let minControl = this.form.get('bathrooms.min');
    let maxControl = this.form.get('bathrooms.max');
    if (minControl.value === '') {
      minControl.setValue(maxControl.value);
    } else if (maxControl.value === '') {
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

  submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;

    if (!this.form.valid) {
      console.log('form invalid!');
      console.log(this.form);
      return;
    }

    let formValues = this.form.value;
    let landlord: any = {};
    let landlordQuickInfo: boolean = false;

    if (
      formValues.landlordQuickInfo !== '' &&
      formValues.landlordQuickInfo !== null
    ) {
      landlord.quickInfo = formValues.landlordQuickInfo;
      landlordQuickInfo = true;
    }

    console.log('form values', formValues);

    if (
      formValues.landlordLookup !== '' &&
      formValues.landlordLookup !== null
    ) {
      landlord.quickInfo = formValues.landlordQuickInfo;
      landlordQuickInfo = true;
    }

    let property = this.propertyMapLocalToApi(formValues);

    if (formValues.claimOwnership === true) {
      this.apiService.getAccount().subscribe(
        response => {
          property.AuthorId = response.id;
          if (landlordQuickInfo) {
            this.addProperty(property, landlord);
          } else {
            this.addProperty(property);
          }
        },
      );
    } else {
      if (landlordQuickInfo) {
        this.addProperty(property, landlord);
      } else {
        this.addProperty(property);
      }
    }


  }

  propertyMapLocalToApi(formValues) {
    let property: any = {};
    // let landlord: any = {};
    for (var key in formValues) {
      console.log(key, formValues[key]);
      if (
        emptyish(formValues[key])
      ) {
        continue;
      }

      switch (key) {
        case 'claimOwnership':
          // we'll manually check this later and look up account info if checked
          // but we do need to prevent it from being added to property as is
          break;
        case 'landlordQuickInfo':
          // we don't want to to be added to the property object
          break;
        case 'bedrooms':
          if (
            !emptyish(formValues.bedrooms.min)
          ) {
            property.bedroomsMin = formValues.bedrooms.min;
            property.bedroomsMax = formValues.bedrooms.max;
          }
          break;
        case 'bathrooms':
          if (
            !emptyish(formValues.bathrooms.min)
          ) {
            property.bathroomsMin = formValues.bathrooms.min;
            property.bathroomsMax = formValues.bathrooms.max;
          }
          break;
        default:
          property[key] = formValues[key];
      }
    }
    return property;
  }

  addProperty(property, landlord: any = undefined) {
    this.apiService.addProperty(property).subscribe(propertyResponse => {

      let propertyId = propertyResponse.id;
      if (landlord !== undefined) {
        this.apiService.addLandlord(landlord).subscribe(
          landlordRequestResponse => {
            let landlordResponse = landlordRequestResponse.body;
            this.apiService.addLandlordToProperty(propertyResponse.id, landlordResponse.id).subscribe(updateResponse => {

              this.displayPropertyCreatedToast(propertyId);
              this.form.reset();
              this.formDirective.resetForm();
            });
          },
          landlordErrorResponse => {
            let contentLocation = landlordErrorResponse.headers.get('Content-Location');
            if (landlordErrorResponse.status === 422 && contentLocation) {
              // landlord already exists and we should use that id to attach to our property
              this.apiService.addLandlordToProperty(propertyResponse.id, contentLocation).subscribe(updateResponse => {

                this.displayPropertyCreatedToast(propertyId);
                this.form.reset();
                this.formDirective.resetForm();
              });
            }
          }
        );
      } else { // no landlord info, we're done
        this.displayPropertyCreatedToast(propertyId);
        this.form.reset();
        this.formDirective.resetForm();
      }
    });
  }

  displayPropertyCreatedToast(propertyId) {
    this.alertService.action({
      data: {
        message: 'The property has been created.',
        action: {
          text: 'View Property',
          navigateTo: `/property/${propertyId}`,
        },
      }
    });
  }

}
