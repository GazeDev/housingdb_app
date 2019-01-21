import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';

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
    private alertService: AlertService,
  ) {
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      address: ['', Validators.compose([Validators.required])],
      landlordQuickInfo: [''],
      // name: [''],
      // iOwn: [''],
      // body: [''],
    });
  }

  ngOnInit() {

  }

  submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;

    if (!this.form.valid) {
      console.log('form invalid!');
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
      console.log(propertyResponse);
      if (landlordQuickInfo) {
        this.apiService.addLandlord(landlord).subscribe(landlordResponse => {
          console.log(landlordResponse);
          this.apiService.addLandlordToProperty(propertyResponse.id, landlordResponse.id).subscribe(updateResponse => {
            console.log('updateResponse');
            console.log(updateResponse);

            // TODO: need to reset form, show confirmation
            this.form.reset();
            let alertText = 'Success. New property created';
            this.alertService.success(alertText);
          });
        });
      } else { // no landlord info, we're done
        // give confirmation alert with link
      }
    });


  }

}
