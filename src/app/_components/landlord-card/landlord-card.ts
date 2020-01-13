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

  @Input('showTitle')
  public showTitle: boolean = true;

  constructor (
    private router: Router,
  ) {

  }

}
