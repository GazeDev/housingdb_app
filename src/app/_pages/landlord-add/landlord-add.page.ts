import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { AuthenticationService } from '_services/index';
import { LandlordInfoValidator } from '_validators/landlord-info-validator';
import { PhoneNumberValidator } from '_validators/phone-number-validator';
import { UrlValidator } from '_validators/url-validator';

@Component({
  selector: 'landlord-add-page',
  templateUrl: './landlord-add.page.html',
  styleUrls: ['./landlord-add.page.scss'],
})
export class LandlordAddPage implements OnInit {

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    public authService: AuthenticationService,
    private toastController: ToastController,
  ) {
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      landlordQuickInfo: [''],
      // iAm: [''],
      name: [''],
      phone: ['', PhoneNumberValidator],
      email: ['', Validators.email],
      website: ['', UrlValidator],
      body: [''],
    },
    {
      validator: LandlordInfoValidator(this.authService.isAuthenticated),
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

    let formValues = this.form.value;
    let landlord: any = {};
    for (var key in formValues) {
      if (formValues[key] === '') {
        continue;
      }

      switch (key) {
        case 'landlordQuickInfo':
          landlord.quickInfo = formValues[key];
          break;
        default:
          landlord[key] = formValues[key];
      }
    }

    this.apiService.addLandlord(landlord).subscribe(landlordResponse => {
      let landlordId = landlordResponse.body.id;
      this.displayLandlordCreatedToast(landlordId);
      this.form.reset();
      this.formDirective.resetForm();
    });

  }

  async displayLandlordCreatedToast(landlordId) {
    let toast = await this.toastController.create({
      message: 'The landlord has been created.',
      color: 'success',
      duration: 4000,
      showCloseButton: true,
      closeButtonText: 'View Landlord'
    });
    toast.onWillDismiss().then(() => {
      this.router.navigate([`/landlord/${landlordId}`]);
    });
    toast.present();
  }

}
