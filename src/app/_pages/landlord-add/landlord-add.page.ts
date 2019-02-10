import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';

@Component({
  selector: 'landlord-add-page',
  templateUrl: './landlord-add.page.html',
  styleUrls: ['./landlord-add.page.scss'],
})
export class LandlordAddPage implements OnInit {

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
      landlordQuickInfo: [''],
      // iAm: [''],
      // name: [''],
      // phone: [''],
      // email: [''],
      // website: [''],
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

    this.apiService.addLandlord(landlord).subscribe(landlordResponse => {
      let landlordId = landlordResponse.id;
      this.displayLandlordCreatedToast(landlordId);
      this.form.reset();
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
