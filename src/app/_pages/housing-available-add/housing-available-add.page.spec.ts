import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAddPage } from './housing-available-add.page';

describe('PropertyAddPage', () => {
  let component: PropertyAddPage;
  let fixture: ComponentFixture<PropertyAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
