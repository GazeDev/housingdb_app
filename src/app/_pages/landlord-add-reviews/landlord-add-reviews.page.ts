import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { Landlord } from '_models/landlord.model';

@Component({
  selector: 'landlord-add-reviews-page',
  templateUrl: './landlord-add-reviews.page.html',
  styleUrls: ['./landlord-add-reviews.page.scss'],
})
export class LandlordAddReviewsPage implements OnInit {

  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;
  landlordId: string;
  landlord: Landlord;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    private toastController: ToastController,
  ){
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      subject: ['', Validators.compose([Validators.required])],
      rating: ['', Validators.compose([Validators.required])],
      body: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.landlordId = params.get('id');
      this.getLandlord();
    });
  }

  submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;

    console.log(this.form);
    if(!this.form.valid) {
      console.log('form invalid!');
      return;
    }

    let landlordSubject = this.form.get('subject').value;
    let landlordRating = this.form.get('rating').value;
    let landlordReviewBody = this.form.get('body').value;

    let landlordReview = {
      subject: landlordSubject,
      rating: landlordRating,
      body: landlordReviewBody
    };

    this.apiService.addLandlordReview(this.landlordId, landlordReview).subscribe(landlordReviewResponse => {
      let landlordReviewId = landlordReviewResponse.id;
      this.displayLandlordReviewCreatedToast(landlordReviewId);
      this.form.reset();
    });
  }

  getLandlord() {
    this.apiService.getLandlord(this.landlordId).subscribe( res => {
      this.landlord = res;
    },
    err => {
      console.log('error getting landlord', err)
    });
  }

  async displayLandlordReviewCreatedToast(landlordId) {
    let toast = await this.toastController.create({
      message: 'The landlord review has been created.',
      color: 'success',
      duration: 4000,
      showCloseButton: true,
      closeButtonText: 'View Review'
    });
    toast.onWillDismiss().then(() => {
      this.router.navigate([`landlord/${this.landlordId}`])
    })
    toast.present();
  }

}
