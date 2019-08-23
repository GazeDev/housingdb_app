import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '_services/api.service';
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
  public reviews: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.landlord = {};
    this.properties = [];
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.landlordId = params.get('id');
      this.getLandlord();
      this.getLandlordProperties();
      this.getLandlordReviews();
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

  getLandlordReviews() {
    this.apiService.getLandlordReviews(this.landlordId).subscribe(res => {
      this.reviews = res;
    },
    err => {
      console.log('error getting landlord reviews', err);
    });
  }
}
