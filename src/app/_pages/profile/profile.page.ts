import { Component, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { AuthenticationService } from '_services/authentication.service';
import { Profile } from '_models/profile.model';
import { UserTypeValidator } from '_validators/user-type-validator';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public profile: Profile;
  public accountId: string;

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean = false;
  currentlySubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private authService: AuthenticationService,
  ) {
    this.form = this.formBuilder.group({
      userData: this.formBuilder.group({
        info: this.formBuilder.group({
          userType: ['', UserTypeValidator],
          userTypeOther: [''],
          landlord: [''],
          address: [''],
          referralSource: [''],
        })
      })
    });
  }

  async ngOnInit() {
    await this.authService.checkLogin();
    if (this.authService.isAuthenticated) {
      this.apiService.getAccount().subscribe(res => {
        console.log('Account Profile', res);
        this.accountId = res.id;
        this.patchProfile(res);
      });
    }
  }

  patchProfile(profile) {
    // do a form patch
    this.form.patchValue(
      profile
    );
  }

  submit() {
    console.log(this.form.value);
    this.currentlySubmitting = true;
    this.submitAttempt = true;

    if (!this.form.valid) {
      console.log('form invalid!');
      return;
    }

    this.apiService.patchAccount(this.accountId, this.form.value).subscribe(res => {
      this.alertService.success('Your profile has been saved!');
    });
  }
}
