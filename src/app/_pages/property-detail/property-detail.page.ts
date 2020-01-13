import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, ContentService } from '_services/index';
import { AuthenticationService } from '_services/index';
import { Property } from '_models/property.model';
import { switchMap } from 'rxjs/operators';
import { Landlord } from '_models/landlord.model';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
})
export class PropertyDetailPage implements OnInit {

  public userAccount: any;
  public propertyId: string;
  // public property: Property;
  public property: any;
  public landlordId: string;
  public landlord: any;
  public reviews: any;
  public externalReviews: any;

  constructor(
    private route: ActivatedRoute,
    public content: ContentService,
    private apiService: ApiService,
    public authenticationService: AuthenticationService,
  ) {
    this.property = <Property>{};
    this.landlord = {};
    this.reviews = [];
  }

  async ngOnInit() {
    await this.authenticationService.checkLogin();
    if (this.authenticationService.isAuthenticated) {
      this.getAccount();
    }

    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('id');
      this.getProperty();
      this.getPropertyReviews();
      this.getPropertyExternalReviews();
    });
  }

  getAccount() {
    this.apiService.getAccount().subscribe(res => {
      this.userAccount = res;
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
        this.landlordId = this.property.LandlordId;
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

  getPropertyExternalReviews() {
    this.apiService.getPropertyExternalReviews(this.propertyId).subscribe(res => {
      this.externalReviews = res.map(x => {
        let hostname = new URL(x.url).hostname;
        hostname = hostname.replace(/^www\./i, '');
        hostname = hostname.charAt(0).toUpperCase() + hostname.slice(1);
        x.name = `Review on ${hostname}`;
        return x;
      });
    },
    err => {
      console.log('error getting property external reviews', err);
    });
  }
}
