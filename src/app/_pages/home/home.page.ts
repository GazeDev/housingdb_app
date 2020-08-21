import { Component } from '@angular/core';
import { AuthenticationService, HeadService } from '_services/index';

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
    private headService: HeadService,
  ) {
    this.env = environment;
  }

  ngOnInit() {
    this.headService.setPageTitle('Home');
  }

  ngOnDestroy() {
    this.headService.setPageTitle('');
  }

  async doLogin() {
    await this.authService.login();
  }

}
