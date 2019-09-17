import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';

import { Landlord } from '_models/landlord.model';

@Component({
  selector: 'landlords-page',
  templateUrl: 'landlords.page.html',
  styleUrls: ['landlords.page.scss'],
})
export class LandlordsPage {

  landlords: Landlord[];

  constructor(
    private apiService: ApiService,
  ) {
    this.landlords = [];
  }

  ngOnInit() {
    this.getLandlords();
  }

  getLandlords() {
    this.apiService.getLandlords().subscribe(res => {
      this.landlords = res;
    },
    err => {
      console.log('error');
      console.log(err);
    });
  }

}
