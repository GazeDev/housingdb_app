import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private router: Router,
    private alertService: AlertService,
    private toastController: ToastController,
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

      let propertyId = propertyResponse.id;
      if (landlordQuickInfo) {

        this.apiService.addLandlord(landlord).subscribe(landlordResponse => {

          this.apiService.addLandlordToProperty(propertyResponse.id, landlordResponse.id).subscribe(updateResponse => {

            this.displayPropertyCreatedToast(propertyId);

            this.form.reset();
          });

        });

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
