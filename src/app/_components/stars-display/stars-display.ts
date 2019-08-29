import { Input, Component } from '@angular/core';

@Component({
  selector: 'stars-display',
  templateUrl: './stars-display.html',
  styleUrls: ['./stars-display.scss'],
})
export class StarsDisplayComponent {
  @Input('rating')
  public rating: any;

  constructor (

  ) {

  }

}
