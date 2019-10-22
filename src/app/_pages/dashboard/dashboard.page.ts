import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';



@Component({
  selector: 'dashboard-page',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage {

  public landlords: any;
  public properties: any;
  public landlordsMap: any;
  public reviews: any;

  constructor(
    private apiService: ApiService,
  ) {
    this.landlords = [];
    this.properties = [];
    this.landlordsMap = {};
    this.reviews = [];
  }

  ngOnInit() {
    this.loadLandlords();
    // Wait until after landlords are loaded to load properties so we can reduce property landlord lookups
    this.loadReviews();
  }

  loadLandlords() {
    this.apiService.getAccountLandlords().subscribe(res => {
      this.landlords = res;
      for (let landlord of res) {
        this.landlordsMap[landlord.id] = landlord;
      }
      this.loadProperties();
    },
    err => {
      console.log('error', err);
      this.loadProperties();
    });
  }

  loadProperties() {
    this.apiService.getAccountProperties().subscribe(res => {
      this.properties = res;
      this.loadPropertiesLandlords();
    },
    err => {
      console.log('error', err);
    });
  }

  loadPropertiesLandlords() {
    for (let property of this.properties) {
      if (property.LandlordId && !this.landlordsMap.hasOwnProperty(property.LandlordId)) {
        this.loadLandlord(property.LandlordId);
      }
    }
  }

  loadLandlord(landlordId: any) {
    // set a placeholder so we know not to load it again
    this.landlordsMap[landlordId] = true;
    this.apiService.getLandlord(landlordId).subscribe(
    res => {
      // create a keyed array so we only have to load each landlord once
      // and can access it in O(1).
      this.landlordsMap[landlordId] = res;
    },
    err => {
      console.log('error loading landlord');
      console.log(err);
    });
  }

  loadReviews() {
    this.apiService.getAccountReviews().subscribe(res => {
      this.reviews = res;
    },
    err => {
      console.log('error', err);
    });
  }

}
