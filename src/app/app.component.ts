import { Component } from '@angular/core';

import { APP_CONFIG } from './app.config';
import { AuthenticationService } from '_services/index';
import { ApiService } from '_services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private apiService: ApiService,
    private authService: AuthenticationService,
  ) {
    this.initializeApp();
    this.apiService.setUrl(APP_CONFIG.apiURL);
  }

  async initializeApp() {
    await this.authService.init();
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
