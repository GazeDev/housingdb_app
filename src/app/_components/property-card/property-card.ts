import { Input, Component } from '@angular/core';
import { Router } from '@angular/router'

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

  @Input('showTitle')
  public showTitle: boolean = true;

  constructor (
    private router: Router,
  ) {

  }

  extractNeighborhood(property: any) {
    if (property.PostalAddresses) {
      let addr = property.PostalAddresses[0];
      return addr.addressNeighborhood;
    } else {
      return '';
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
}
