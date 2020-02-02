import { Component } from '@angular/core';
import { environment } from '_environment';
// import { APP_CONFIG } from './app.config';
import { AuthenticationService } from '_services/index';
import { ApiService } from '_services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public env: any = environment;

  constructor(
    private apiService: ApiService,
    public authService: AuthenticationService,
  ) {
    this.initializeApp();
    this.apiService.setUrl(environment.apiURL);
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
