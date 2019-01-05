import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';

@Component({
  selector: 'elsewhere-page',
  templateUrl: 'elsewhere.page.html',
  styleUrls: ['elsewhere.page.scss'],
})
export class ElsewherePage {
  constructor(
    private apiService: ApiService,
  ) {

  }

}
