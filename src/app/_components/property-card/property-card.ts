import { Input, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '_services/api.service';

@Component({
  selector: 'property-card',
  templateUrl: './property-card.html',
  styleUrls: ['./property-card.scss'],
})
export class PropertyCardComponent {
  @Input('property')
  public property: any;

  @Input('landlord')
  public landlord: any;

  @Input('location')
  public location: any;

  @Input('showTitle')
  public showTitle: boolean = true;

  constructor (
    private router: Router,
    private apiService: ApiService,
  ) {

  }

  ngOnChanges(changes: any) {
    // If the property has a Location and it wasn't loaded for us,
    // load it ourselves
    if (changes.hasOwnProperty('property')) {
      if (this.property.LocationId && !this.location) {
        this.loadLocation();
      }
    }
  }

  extractAddress(property: any) {
    if (property.PostalAddresses) {
      let addr = property.PostalAddresses[0];
      return `${addr.streetAddress}, ${addr.addressLocality}, ${addr.addressRegion} ${addr.postalCode}`;
    } else {
      return '';
    }
  }

  loadLocation() {
    this.apiService.getLocation(this.property.LocationId).subscribe(res => {
      console.log('location response', res);
      this.location = res;
    })
  }
}
