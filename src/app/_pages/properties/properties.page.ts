import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';

import { Property } from '_models/property.model';

@Component({
  selector: 'properties-page',
  templateUrl: 'properties.page.html',
  styleUrls: ['properties.page.scss'],
})
export class PropertiesPage {

  properties: Property[];
  landlords: any;
  // properties: any;

  constructor(
    private apiService: ApiService,
  ) {
    this.properties = [];
    this.landlords = {};
  }

  ngOnInit() {
    this.getProperties();
  }

  getProperties() {
    this.apiService.getProperties().subscribe(res => {
      console.log('properties');
      console.log(res);
      this.properties = res;
      this.loadPropertiesLandlords();
    },
    err => {
      console.log('error');
      console.log(err);
    });
  }

  extractAddress(property: any) {
    let addr = property.PostalAddresses[0];
    return `${addr.streetAddress}, ${addr.addressLocality}, ${addr.addressRegion} ${addr.postalCode}`;
  }

  extractNeighborhood(property: any) {
    let addr = property.PostalAddresses[0];
    return addr.addressNeighborhood;
  }

  loadPropertiesLandlords() {
    for (let property of this.properties) {
      if (property.LandlordId && !this.landlords.hasOwnProperty(property.LandlordId)) {
        this.loadLandlord(property);
      }
    }
  }

  loadLandlord(property: any) {
    // set a placeholder so we know not to load it again
    this.landlords[property.LandlordId] = true;
    this.apiService.getLandlord(property.LandlordId).subscribe(
    res => {
      // create a keyed array so we only have to load each landlord once
      // and can access it in O(1).
      this.landlords[property.LandlordId] = res;
    },
    err => {
      console.log('error loading landlord');
      console.log(err);
    });
  }


}
