import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '_services/api.service';
import { Property } from '_models/property.model';
import { switchMap } from 'rxjs/operators';
import { Landlord } from '_models/landlord.model';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
})
export class PropertyDetailPage implements OnInit {

  public propertyId: string;
  public property: Property;
  public landlordId: string;
  public landlord: Landlord;
  public reviews: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.property = <Property>{};
    this.landlord = {};
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('id');
      this.getProperty();
      this.getPropertyReviews();
    });

  }
  loadPropertiesLandlords() {
    this.apiService.getLandlord(this.landlordId).subscribe(res => {
      this.landlord = res;
    },
    err => {
      console.log('error');
      console.log(err);
    });
  }
  getProperty() {
    this.apiService.getProperty(this.propertyId).subscribe(res => {
      this.property = res;
      if (this.property.LandlordId) {
        this.landlordId = this.property.LandlordId
        this.loadPropertiesLandlords();
      }
    },
    err => {
      console.log('error');
      console.log(err);
    });
  }

  extractNeighborhood(property: any) {
    let addr = property.PostalAddresses[0];
    return addr.addressNeighborhood;
  }
  extractAddress(property: any) {
    let addr = property.PostalAddresses[0];
    return `${addr.streetAddress}, ${addr.addressLocality}, ${addr.addressRegion} ${addr.postalCode}`;
  }

  getPropertyReviews() {
    this.apiService.getPropertyReviews(this.propertyId).subscribe(res => {
      this.reviews = res;
    },
    err => {
      console.log('error getting property reviews', err);
    });
  }
}
