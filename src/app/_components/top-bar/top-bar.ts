import { Input, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '_services/index';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.html',
  styleUrls: ['./top-bar.scss'],
})
export class TopBarComponent {

  constructor (
    private router: Router,
    private authService: AuthenticationService,
  ) {

  }

  goHome() {
    this.router.navigate(['/']);
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
