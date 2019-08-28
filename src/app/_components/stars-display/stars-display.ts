import { Input, Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'stars-display',
  templateUrl: './stars-display.html',
  styleUrls: ['./stars-display.scss'],
})
export class StarsDisplayComponent {
  @Input('rating')
  public rating: any;

  constructor (
    // private router: Router,
  ) {

  }

  // goToProperty() {
  //   this.router.navigate([`/property/${ this.property.id }`]);
  // }

}
