import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAddReviewsPage } from './property-add-reviews.page';

describe('PropertyAddReviewsPage', () => {
  let component: PropertyAddReviewsPage;
  let fixture: ComponentFixture<PropertyAddReviewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declaration: [ PropertyAddReviewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAddReviewsPage);
    component fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
