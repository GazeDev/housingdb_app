import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordDetailPage } from './landlord-detail.page';

describe('LandlordDetailPage', () => {
  let component: LandlordDetailPage;
  let fixture: ComponentFixture<LandlordDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
