import { Component, ViewChild } from '@angular/core';
import { ApiService, HeadService } from '_services/index';
import { HousingAvailable } from '_models/housing-available.model';
import { Body } from '@angular/http/src/body';

@Component({
  selector: 'housing-availables-page', // should be also "-page"?
  templateUrl: 'housing-availables.page.html',
  styleUrls: ['housing-availables.page.scss'],
})
export class HousingAvailablesPage {

  loading: boolean = true;
  housingAvailables: HousingAvailable[]; // should be "any"?
  page: any;

  constructor(
    private apiService: ApiService,
    private headService: HeadService,
  ) {
    this.housingAvailables = [];
    this.page = {
      offset: 0,
      size: 25,
    };
  }

  ngOnInit() {
    this.getHousingAvailables();
    this.headService.setPageTitle('Housing Available: ');
  }

  ngOnDestroy() {
    this.headService.setPageTitle('');
  }

  pageUpdated($event) {
    this.page.offset = $event.pageIndex;
    this.page.size = $event.pageSize;
  }

  getHousingAvailables() {
    this.loading = true;
    this.apiService.getHousingAvailables().subscribe(res => {
      this.housingAvailables = res;
      this.loading = false;
    },
    err => {
      console.log('Error getting HousingAvailables', err);
      this.loading = false;
    });
  }
}
