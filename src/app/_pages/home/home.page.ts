import { Component } from '@angular/core';

import { AuthenticationService } from '_services/index';

import { environment } from '_environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public env: any;

  constructor(
    public authService: AuthenticationService,
  ) {
    this.env = environment;
  }

  async doLogin() {
    await this.authService.login();
  }

}
