import { Input, Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'review-card',
  templateUrl: 'review-card.html',
  styleUrls: ['review-card.scss'],
})
export class ReviewCardComponent {
  @ViewChild("reviewElem") reviewProp: ElementRef;

  @Input('review')
  public review: any;
  public isTarget: boolean;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
  ) {
    this.isTarget = false;
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragments => {
      console.log('fragments', fragments);
      if (fragments == this.review.id) {
        this.isTarget = true;
        this.elementRef.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        console.log('review ' + this.review.subject + ' is focused');
      } else {
        this.isTarget = false;
      }
    });
  }

  reviewedItem() {
    if (this.review.reviewableType === "landlord") {
      return `/landlord/${ this.review.reviewableId }`;
    } else {
      return `/property/${ this.review.reviewableId }`;
    }
  }

  goToReviewedItem() {
    if (this.review.reviewableType === "landlord") {
      this.router.navigate([`/property/${ this.review.id }`]);
    } else {
      this.router.navigate([`/property/${ this.review.id }`]);
    }

  }

}
