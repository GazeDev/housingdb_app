import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { Property } from '_models/property.model';

@Component({
  selector: 'property-add-reviews-page',
  templateUrl: './property-add-reviews.page.html',
  styleUrls: ['./property-add-reviews.page.scss'],
})
export class PropertyAddReviewsPage implements OnInit {

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;
  propertyId: string;
  property: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
  ){
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.property = {};
    this.form = this.formBuilder.group({
      subject: ['', Validators.compose([Validators.required])],
      rating: ['', Validators.compose([Validators.required])],
      body: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('id');
      this.getProperty();
    });
  }

  submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;
    if(!this.form.valid) {
      console.log('form invalid!');
      return;
    }

    let propertySubject = this.form.get('subject').value;
    let propertyRating = this.form.get('rating').value;
    let propertyReviewBody = this.form.get('body').value;

    let propertyReview = {
      subject: propertySubject,
      rating: propertyRating,
      body: propertyReviewBody
    };

    this.apiService.addPropertyReview(this.propertyId, propertyReview).subscribe(propertyReviewResponse => {
      let propertyReviewId = propertyReviewResponse.id;
      this.displayPropertyReviewCreatedToast(propertyReviewId);
      this.form.reset();
      this.formDirective.resetForm();
    });
  }

  getProperty() {
    this.apiService.getProperty(this.propertyId).subscribe( res => {
      this.property = res;
    },
    err => {
      console.log('error getting property', err)
    });
  }

  setRating(i) {
    this.form.get('rating').setValue(i);
  }

  displayPropertyReviewCreatedToast(propertyId) {
    this.alertService.action({
      data: {
        message: 'The property review has been created.',
      },
      duration: 4000,
    });
    this.router.navigate([`property/${this.propertyId}`]);
  }

}
