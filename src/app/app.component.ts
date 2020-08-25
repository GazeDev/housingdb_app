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
    if (this.env.siteName) {
      this.headService.setSiteTitle(this.env.siteName);
    }
    let custom = this.env.custom;
    if (custom.manifestUrl) {
      this.headService.setManifest(custom.manifestUrl);
    }
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

  sameOrigin(url) {
    // determines whether the passed in url is of the same origin as the window location
    return url.indexOf(window.location.origin) === 0;
  }

  routerifiedLink(url) {
    // removes the origin of a url
    let origin = new URL(url).origin;
    let link = url.slice(origin.length);
    if (link.length === 0) {
      return '/';
    }
    return link;
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
