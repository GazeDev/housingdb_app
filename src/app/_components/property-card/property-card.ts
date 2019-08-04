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

  constructor (
    private router: Router,
  ) {

  }

  goToProperty() {
    this.router.navigate([`/property/${ this.property.id }`]);
  }

  extractNeighborhood(property: any) {
    let addr = property.PostalAddresses[0];
    return addr.addressNeighborhood;
  }
  extractAddress(property: any) {
    let addr = property.PostalAddresses[0];
    return `${addr.streetAddress}, ${addr.addressLocality}, ${addr.addressRegion} ${addr.postalCode}`;
  }
}
