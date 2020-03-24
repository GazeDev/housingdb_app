import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';

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

  constructor(
    private apiService: ApiService,
  ) {
    this.landlords = [];

    this.page = {
      offset: 0,
      size: 25,
    };
  }

  ngOnInit() {
    this.getLandlords();
  }

  pageUpdated($event) {
    this.page.offset = $event.pageIndex;
    this.page.size = $event.pageSize;
  }

  getLandlords() {
    this.loading = true;
    this.apiService.getLandlords().subscribe(res => {
      this.landlords = res;
      this.loading = false;
    },
    err => {
      console.log('error');
      console.log(err);
      this.loading = false;
    });
  }

}
