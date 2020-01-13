import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  allLocations: any;

  @ViewChild('ngFormDirective') formDirective;
  form: FormGroup;
  submitAttempt: boolean;
  currentlySubmitting: boolean;

  filtersOpen: boolean = false;
  originalOrder: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.properties = [];
    this.landlords = {};
    this.locations = {};
    this.allLocations = {};

    this.submitAttempt = false;
    this.currentlySubmitting = false;
    this.form = this.formBuilder.group({
      name: [''],
      address: [''],
      bedrooms: [''],
      locations: [''],
    });

    // used to preserve order in the keyvalue pipe in the template
    this.originalOrder = (a: any, b: any): number => {
      return 0;
    }
  }

  ngOnInit() {
    this.getProperties();
    this.loadAllLocations();
  }

  getProperties(options = {}) {
    this.apiService.getProperties(options).subscribe(res => {
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
      console.log('Error loading location', err);
    });
  }

  loadAllLocations() {
    this.apiService.getLocations().subscribe(res => {
      this.buildAllLocations(res);
    });
  }

  buildAllLocations(locations) {
    for (let state of locations) {
      for (let city of state.children) {
        if (city.children.length === 1 && city.name === city.children[0].name) {
          this.allLocations[city.children[0].id] = {
            name: city.children[0].name,
          };
        } else {
          this.allLocations[city.id] = {
            name: city.name,
            children: {},
          };
          for (let location of city.children) {
            this.allLocations[city.id].children[location.id] = {
              name: location.name,
            };
          }
        }
      }
    }
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
    this.getProperties(this.form.value);
  }


}
