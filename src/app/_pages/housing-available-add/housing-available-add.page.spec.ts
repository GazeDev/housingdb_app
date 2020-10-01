import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingAvailableAddPage } from './housing-available-add.page';

describe('HousingAvailableAddPage', () => {
  let component: HousingAvailableAddPage;
  let fixture: ComponentFixture<HousingAvailableAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingAvailableAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingAvailableAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
