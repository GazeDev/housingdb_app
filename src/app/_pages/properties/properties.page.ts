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
  locations: any;
  renderLocations: any[];
  // properties: any;

  constructor(
    private apiService: ApiService,
  ) {
    this.properties = [];
    this.landlords = {};
    this.locations = {};
    this.renderLocations = [];
  }

  ngOnInit() {
    this.getProperties();
    this.loadAllLocations();
  }

  getProperties() {
    this.apiService.getProperties().subscribe(res => {
      this.properties = res;
      this.loadPropertiesLandlords();
      this.loadPropertiesLocations();
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

  loadPropertiesLocations() {
    for (let property of this.properties) {
      if (property.LocationId && !this.locations.hasOwnProperty(property.LocationId)) {
        this.loadLocation(property);
      }
    }
  }

  loadLocation(property: any) {
    // set a placeholder so we know not to load it again
    this.locations[property.LocationId] = true;
    this.apiService.getLocation(property.LocationId).subscribe(
    res => {
      // create a keyed array so we only have to load each landlord once
      // and can access it in O(1).
      this.locations[property.LocationId] = res;
    },
    err => {
      console.log('error loading location');
      console.log(err);
    });
  }

  loadAllLocations() {
    this.apiService.getLocations().subscribe(res => {
      console.log('all locations', res);
      // this.allLocations = res;
      this.buildLocations(res);
    });
  }

  buildLocations(locations) {
    for (let state of locations) {
      console.log('state', state.name);
      this.renderLocations.push({
        name: state.name,
        id: state.id,
        active: false,
      });
      for (let city of state.children) {
        console.log('city', city.name);
        if (city.children.length === 1 && city.name === city.children[0].name) {
          this.renderLocations.push({
            name: '-' + city.children[0].name,
            id: city.children[0].id,
            active: true,
          });
        } else {
          this.renderLocations.push({
            name: '-' + city.name,
            id: city.id,
            active: false,
          });
          for (let location of city.children) {
            console.log('location', location.name);
            this.renderLocations.push({
              name: '--' + location.name,
              id: location.id,
              active: true,
            });
          }
        }
      }
    }
    console.log(this.renderLocations);
  }


}
