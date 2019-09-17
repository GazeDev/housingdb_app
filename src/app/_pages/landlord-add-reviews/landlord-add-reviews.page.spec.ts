import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordAddReviewsPage } from './landlord-add-reviews.page';

describe('LandlordAddReviewsPage', () => {
  let component: LandlordAddReviewsPage;
  let fixture: ComponentFixture<LandlordAddReviewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declaration: [ LandlordAddReviewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordAddReviewsPage);
    component fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
