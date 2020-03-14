import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '_services/api.service';
import { AuthenticationService } from '_services/index';

@Component({
  selector: 'app-property-add-bulk',
  templateUrl: './property-add-bulk.page.html',
  styleUrls: ['./property-add-bulk.page.scss'],
})
export class PropertyAddBulkPage implements OnInit {

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;

  public properties: any;
  public propertiesResults: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public authService: AuthenticationService,
  ) {
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      properties: ['', Validators.compose([Validators.required])],
    });

  }

  async ngOnInit() {
    await this.authService.checkLogin();
  }

  async submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;

    if (!this.form.valid) {
      console.log('form invalid!');
      console.log(this.form);
      return;
    }

    let properties = this.form.get('properties').value;

    this.properties = JSON.parse(properties);
    // if the property has a landlord, then the landlord needs to be submitted first.
    // each property must be submitted with a second of delay
    for (let property of this.properties) {
      if (property.hasOwnProperty('landlord')) {
        property.landlord = {
          quickInfo: property.landlord,
        };
        this.addProperty(property, property.landlord);
      } else {
        this.addProperty(property);
      }
      await this.sleep(500);
    }

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  addProperty(property, landlord: any = undefined) {
    // make a non-referencing copy of property so we can remove landlord
    let submitProperty = JSON.parse(JSON.stringify(property));
    delete submitProperty.landlord;
    this.apiService.addProperty(submitProperty).subscribe(propertyResponse => {
      let propertyId = propertyResponse.id;
      property.id = propertyId;
      let addr = propertyResponse.PostalAddresses[0];
      property.savedAddress = `${addr.streetAddress}, ${addr.addressLocality}, ${addr.addressRegion} ${addr.postalCode}`;
      property.loading = false;
      property.submitted = true;
      if (landlord !== undefined) {
        this.apiService.addLandlord(landlord).subscribe(
          landlordRequestResponse => {
            let landlordResponse = landlordRequestResponse.body;
            property.landlord.id = landlordResponse.id;
            property.landlord.loading = false;
            this.apiService.addLandlordToProperty(propertyResponse.id, landlordResponse.id).subscribe(updateResponse => {
              // NOTE: call termination
              this.updatePropertiesResults();
            });
          },
          landlordErrorResponse => {
            let contentLocation = landlordErrorResponse.headers.get('Content-Location');
            if (landlordErrorResponse.status === 422 && contentLocation) {
              // landlord already exists and we should use that id to attach to our property
              property.landlord.id = contentLocation;
              property.landlord.loading = false;
              property.landlord.submitted = true;
              this.apiService.addLandlordToProperty(propertyResponse.id, contentLocation).subscribe(updateResponse => {
                // NOTE: call termination
                // TODO: should this status/errors show?
                this.updatePropertiesResults();
              });
            } else {
              // NOTE: call termination
              property.landlord.loading = false;
              let err = landlordErrorResponse.body;
              property.landlord.error = err.error ? err.error.message : err;
              this.updatePropertiesResults();
            }
          }
        );
      } else { // no landlord info, we're done
        // NOTE: call termination
        this.updatePropertiesResults();
      }
    },
    propertyErrorResponse => {
      property.loading = false;
      property.error = propertyErrorResponse.error ? propertyErrorResponse.error.message : propertyErrorResponse;
      if (property.landlord !== undefined) {
        property.landlord.loading = false;
      }
      this.updatePropertiesResults();
    });
  }

  updatePropertiesResults() {
    this.propertiesResults = JSON.stringify(this.properties);
  }

  typeOf(input: any) {
    return typeof (input);
  }

}
