import { Input, Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'landlord-card',
  templateUrl: './landlord-card.html',
  styleUrls: ['./landlord-card.scss'],
})
export class LandlordCardComponent {

  @Input('landlord')
  public landlord: any;

  constructor (
    private router: Router,
  ) {

  }

  goToLandlord() {
    this.router.navigate([`/landlord/${ this.landlord.id }`]);
  }

}
