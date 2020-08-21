import { Component } from '@angular/core';
import { environment } from '_environment';
// import { APP_CONFIG } from './app.config';
import { HttpClient } from '@angular/common/http';
import { ApiService, AuthenticationService, HeadService } from '_services/index';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public env: any = environment;
  public appMenu: any = false;

  constructor(
    private headService: HeadService,
    private apiService: ApiService,
    public authService: AuthenticationService,
    public httpClient: HttpClient,
  ) {
    this.setCustomizations();
    this.initializeApp();
    this.apiService.setUrl(environment.apiURL);
  }

  setCustomizations() {
    console.log(this.env.custom.logoUrl);
    if (this.env.siteName) {
      this.headService.setSiteTitle(this.env.siteName);
    }
    let custom = this.env.custom;
    if (custom.faviconUrl) {
      this.headService.setFavicon(custom.faviconUrl);
    }
    if (custom.stylesheetUrl) {
      this.headService.setCustomStylesheet(custom.stylesheetUrl);
    }
    if(custom.appMenuUrl) {
      this.httpClient.get<any>(custom.appMenuUrl).subscribe(res=> {
        console.log('menu json', res);
        this.appMenu = res;
      });
    }
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
