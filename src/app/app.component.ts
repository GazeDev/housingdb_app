import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { APP_CONFIG } from './app.config';
import { AuthenticationService } from '_services/index';
import { ApiService } from '_services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
  ) {
    this.initializeApp();
    this.apiService.setUrl(APP_CONFIG.apiURL);
  }

  async initializeApp() {
    await this.authenticationService.init();
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }
}
