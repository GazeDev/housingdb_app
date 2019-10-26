import { Input, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '_services/index';

@Component({
  selector: 'review-card',
  templateUrl: 'review-card.html',
  styleUrls: ['review-card.scss'],
})
export class ReviewCardComponent {

  @Input('review')
  public review: any;
  public isTarget: boolean;

  constructor (
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    public content: ContentService,
  ) {
    this.isTarget = false;
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragments => {
      if (fragments == this.review.id) {
        this.isTarget = true;
        this.elementRef.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
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

}
