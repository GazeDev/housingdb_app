import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, ContentService } from '_services/index';
import { AuthenticationService } from '_services/index';
import { switchMap } from 'rxjs/operators';
import { Landlord } from '_models/landlord.model';
import { Property } from '_models/property.model';

@Component({
  selector: 'app-landlord-detail',
  templateUrl: './landlord-detail.page.html',
  styleUrls: ['./landlord-detail.page.scss'],
})
export class LandlordDetailPage implements OnInit {

  public userAccount: any;
  public landlordId: string;
  public landlord: Landlord;
  public properties: Property[];
  public propertiesPage: any;
  public locations: any;
  public reviews: any;
  public externalReviews: any;

  constructor(
    private route: ActivatedRoute,
    public content: ContentService,
    private apiService: ApiService,
    public authenticationService: AuthenticationService,
  ) {
    this.landlord = {};
    this.properties = [];
    this.propertiesPage = {
      offset: 0,
      size: 4,
    };
    this.locations = {};
    this.reviews = [];
  }

  async ngOnInit() {
    await this.authenticationService.checkLogin();
    if (this.authenticationService.isAuthenticated) {
      this.getAccount();
    }
    this.route.paramMap.subscribe(params => {
      if (!this.isUuid(params.get('id'))) {
        this.apiService.getLandlordByMachineName(params.get('id')).subscribe(res => {
          this.landlordId = res.id;
          this.getLandlordAndRelatedContent()
        });
      } else {
        this.landlordId = params.get('id');
        this.getLandlordAndRelatedContent()
      }
    });
  }

  pageUpdated($event) {
    this.propertiesPage.offset = $event.pageIndex;
    this.propertiesPage.size = $event.pageSize;
  }

  isUuid(input) {
    const regex = RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    return regex.test(input);
  }

  getAccount() {
    this.apiService.getAccount().subscribe(res => {
      this.userAccount = res;
    });
  }

  getLandlordAndRelatedContent() {
    this.getLandlord();
    this.getLandlordProperties();
    this.getLandlordReviews();
    this.getLandlordExternalReviews();
  }

  getLandlord() {
    this.apiService.getLandlord(this.landlordId).subscribe(res => {
      this.landlord = res;
    },
    err => {
      console.log('error getting landlord', err);
    });
  }

  getLandlordProperties() {
    this.apiService.getLandlordProperties(this.landlordId).subscribe(res => {
      this.properties = res;
      this.loadPropertiesLocations();
    },
    err => {
      console.log('error getting landlord properties', err);
    });
  }

  getLandlordReviews() {
    this.apiService.getLandlordReviews(this.landlordId).subscribe(res => {
      this.reviews = res;
    },
    err => {
      console.log('error getting landlord reviews', err);
    });
  }

  getLandlordExternalReviews() {
    this.apiService.getLandlordExternalReviews(this.landlordId).subscribe(res => {
      this.externalReviews = res.map(x => {
        let hostname = new URL(x.url).hostname;
        hostname = hostname.replace(/^www\./i, '');
        hostname = hostname.charAt(0).toUpperCase() + hostname.slice(1);
        x.name = `Review on ${hostname}`;
        return x;
      });
    },
    err => {
      console.log('error getting landlord external reviews', err);
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
}
