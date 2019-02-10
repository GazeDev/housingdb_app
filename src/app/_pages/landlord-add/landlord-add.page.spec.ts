import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordAddPage } from './landlord-add.page';

describe('LandlordAddPage', () => {
  let component: LandlordAddPage;
  let fixture: ComponentFixture<LandlordAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
