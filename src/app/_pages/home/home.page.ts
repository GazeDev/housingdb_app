import { Component } from '@angular/core';

import { AuthenticationService } from '_services/index';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private accountUrl: any;

  constructor(
    private authService: AuthenticationService,
  ) {

  }

  async doLogin() {
    await this.authService.login();
  }

  async doLogout() {
    await this.authService.logout();
  }

  async accountManagement() {
    await this.authService.account();
  }

}
