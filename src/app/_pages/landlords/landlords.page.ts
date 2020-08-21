import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, HeadService } from '_services/index';
import { Landlord } from '_models/landlord.model';

@Component({
  selector: 'landlords-page',
  templateUrl: 'landlords.page.html',
  styleUrls: ['landlords.page.scss'],
})
export class LandlordsPage {

  loading: boolean = true;
  landlords: Landlord[];
  page: any;

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;

  filtersOpen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private headService: HeadService,
  ) {
    this.landlords = [];

    this.page = {
      offset: 0,
      size: 25,
    };

    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      search: [''],
      name: [''],
      phone: [''],
      email: [''],
    });
  }

  ngOnInit() {
    this.headService.setPageTitle('Landlords');
    this.getLandlords();
  }

  ngOnDestroy() {
    this.headService.setPageTitle('');
  }

  pageUpdated($event) {
    this.page.offset = $event.pageIndex;
    this.page.size = $event.pageSize;
  }

  getLandlords(options = {}) {
    this.loading = true;
    this.apiService.getLandlords(options).subscribe(res => {
      this.landlords = res;
      this.loading = false;
    },
    err => {
      console.log('error');
      console.log(err);
      this.loading = false;
    });
  }

  toggleFilters() {
    if (this.filtersOpen === true) {
      this.filtersOpen = false;
    } else {
      this.filtersOpen = true;
    }
  }

  resetForm() {
    this.form.reset();
    this.formDirective.resetForm();
    // if we're clearing the form, we're clearing the filters, so we re-submit
    this.submit();
  }

  submit() {
    this.loading = true;
    this.getLandlords(this.form.value);
  }

}
