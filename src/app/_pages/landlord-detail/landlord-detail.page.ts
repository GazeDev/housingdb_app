import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '_services/api.service';
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

  public landlordId: string;
  public landlord: Landlord;
  public properties: Property[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authenticationService: AuthenticationService
  ) {
    this.landlord = {};
    this.properties = [];
  }

  async ngOnInit() {
    await this.authenticationService.checkLogin();
    if (this.authenticationService.isAuthenticated){

    }
    this.route.paramMap.subscribe(params => {
      this.landlordId = params.get('id');
      this.getLandlord();
      this.getLandlordProperties();
    });
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
    },
    err => {
      console.log('error getting landlord properties', err);
    });
  }
}
