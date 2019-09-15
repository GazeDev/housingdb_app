import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { AuthenticationService } from '_services/index';
import { NumberRangeValidator, NumberRangeItemValidator } from '_validators/range-validator';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.page.html',
  styleUrls: ['./property-add.page.scss'],
})
export class PropertyAddPage implements OnInit {

  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    public authenticationService: AuthenticationService,
    private toastController: ToastController,
  ) {
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      address: ['', Validators.compose([Validators.required])],
      landlordQuickInfo: [''],
      // iOwn: [''],
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
      body: [''],
    });
  }

  async ngOnInit() {
    await this.authenticationService.checkLogin();
  }

  bedroomItemValidator() {
    return NumberRangeItemValidator({
      modulo: 1,
      min: 0,
      max: 10,
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
    let landlordQuickInfo = this.form.get('landlordQuickInfo').value;
    let landlord = {
      quickInfo: landlordQuickInfo
    };
    let property = this.form.value;
    delete property.landlordQuickInfo;
    console.log(this.form.get('address').value);

    this.apiService.addProperty(property).subscribe(propertyResponse => {

      let propertyId = propertyResponse.id;
      if (landlordQuickInfo) {

        this.apiService.addLandlord(landlord).subscribe(
          landlordRequestResponse => {
            let landlordResponse = landlordRequestResponse.body;
            this.apiService.addLandlordToProperty(propertyResponse.id, landlordResponse.id).subscribe(updateResponse => {

              this.displayPropertyCreatedToast(propertyId);

              this.form.reset();
            });
          },
          landlordErrorResponse => {
            let contentLocation = landlordErrorResponse.headers.get('Content-Location');
            if (landlordErrorResponse.status === 422 && contentLocation) {
              // landlord already exists and we should use that id to attach to our property
              this.apiService.addLandlordToProperty(propertyResponse.id, contentLocation).subscribe(updateResponse => {

                this.displayPropertyCreatedToast(propertyId);

                this.form.reset();
              });
            }
          }
        );

      } else { // no landlord info, we're done
        this.displayPropertyCreatedToast(propertyId);
      }
    });


  }

  async displayPropertyCreatedToast(propertyId) {
    let toast = await this.toastController.create({
      message: 'The property has been created.',
      color: 'success',
      duration: 4000,
      showCloseButton: true,
      closeButtonText: 'View Property'
    });
    toast.onWillDismiss().then(() => {
      this.router.navigate([`/property/${propertyId}`]);
    });
    toast.present();
  }

}
