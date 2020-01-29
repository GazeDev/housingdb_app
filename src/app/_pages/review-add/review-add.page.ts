import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, startWith } from 'rxjs/operators';
import { ApiService } from '_services/api.service';
import { AlertService } from '_services/alert.service';
import { Property } from '_models/property.model';
import { Landlord } from '_models/landlord.model';
import { AuthenticationService } from '_services/index';
import { NumberRangeValidator, NumberRangeItemValidator } from '_validators/range-validator';
import { UrlValidator } from '_validators/url-validator';
import { emptyish } from '_helpers/emptyish';

@Component({
  selector: 'review-add-page',
  templateUrl: './review-add.page.html',
  styleUrls: ['./review-add.page.scss'],
})
export class ReviewAddPage implements OnInit {

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;
  reviewableType: string;
  reviewableId: string;
  reviewable: object;
  landlordOptions: Observable<Landlord[]>;
  propertyOptions: Observable<Property[]>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    public authService: AuthenticationService,
  ) {
    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      reviewableType: ['', Validators.compose([Validators.required])],
      reviewableId: ['', Validators.compose([Validators.required])],
      reviewableLookup: ['', ],
      subject: ['', Validators.compose([Validators.required])],
      rating: ['', Validators.compose([Validators.required])],
      body: ['', Validators.compose([Validators.required])],
    },
    {
      validator: ReviewableValidator(),
    });

    this.form.get('reviewableLookup').valueChanges.subscribe(value => {
      this.landlordOptions = this.getLandlordOptions(value);
      this.propertyOptions = this.getPropertyOptions(value);
    });

  }

  async ngOnInit() {
    await this.authService.checkLogin();
    this.route.queryParamMap.subscribe(params => {
      this.reviewableType = params.get('reviewableType');
      this.reviewableId = params.get('reviewableId');
      this.getReviewable();
    });

  }

  getLandlordOptions(value: string): Observable<Landlord[]> {
    let results = this.apiService.getLandlords({search: value});
    return results;
  }

  getPropertyOptions(value: string): Observable<Property[]> {
    let results = this.apiService.getProperties({search: value});
    return results;
  }

  setSelection(type, item) {
    this.reviewable = item;
    this.reviewableType = type;
    this.reviewableId = item.id;
    this.form.patchValue({
      reviewableType: type,
      reviewableId: item.id,
    });
  }

  clearReviewable() {
    this.reviewable = undefined;
    this.reviewableType = undefined;
    this.reviewableId = undefined;
    this.form.patchValue({
      reviewableType: '',
      reviewableId: '',
    });
  }

  // addItem(type, text) {
  //   console.log('the user would like to add a new ' + type, text);
  // }

  submit() {
    this.currentlySubmitting = true;
    this.submitAttempt = true;
    if(!this.form.valid) {
      return;
    }

    let reviewableType = this.form.get('reviewableType').value;
    let reviewableId = this.form.get('reviewableId').value;

    let reviewSubject = this.form.get('subject').value;
    let reviewRating = this.form.get('rating').value;
    let reviewBody = this.form.get('body').value;

    let review = {
      subject: reviewSubject,
      rating: reviewRating,
      body: reviewBody
    };

    this.apiService.addReview(reviewableType, reviewableId, review).subscribe(reviewResponse => {
      let reviewId = reviewResponse.id;
      this.displayReviewCreatedToast(reviewableType, reviewableId, reviewId);
      this.form.reset();
      this.formDirective.resetForm();
    });
  }

  getReviewable() {
    if (this.reviewableType == "property") {
      this.getProperty();
    } else if (this.reviewableType == "landlord") {
      this.getLandlord();
    }
  }

  getProperty() {
    this.apiService.getProperty(this.reviewableId).subscribe(res => {
      this.setSelection(this.reviewableType, res);
    },
    err => {
      console.log('error getting property', err);
    });
  }

  getLandlord() {
    this.apiService.getLandlord(this.reviewableId).subscribe( res => {
      this.setSelection(this.reviewableType, res);
    },
    err => {
      console.log('error getting landlord', err)
    });
  }

  setRating(i) {
    this.form.get('rating').setValue(i);
  }

  displayReviewCreatedToast(reviewableType, reviewableId, reviewId) {
    this.alertService.action({
      data: {
        message: `The ${reviewableType} review has been created.`,
      },
      duration: 4000,
    });
    this.router.navigate([`${reviewableType}/${reviewableId}`], {
      fragment: reviewId,
    });
  }

}


import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function ReviewableValidator(): ValidatorFn {

  return (group: AbstractControl): ValidationErrors | null => {
    let reviewableTypeControl = group.get('reviewableType');
    let reviewableTypeValue = reviewableTypeControl.value;

    let reviewableIdControl = group.get('reviewableId');
    let reviewableIdValue = reviewableIdControl.value;

    let reviewableLookupControl = group.get('reviewableLookup');

    reviewableLookupControl.setErrors(null);

    // No errors if type and id set
    if (reviewableTypeValue !== '' && reviewableIdValue !== '') {
      return null;
    }

    // one or more empty
    reviewableLookupControl.setErrors({reviewableSelectionNotSet: true});
    return {'reviewableSelectionNotSet': {message: "Reviewable Selection empty and required"}};
  }
}
