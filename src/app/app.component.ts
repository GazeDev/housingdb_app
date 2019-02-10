import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { APP_CONFIG } from './app.config';
import { ApiService } from '_services/api.service';

import { KeycloakProfile, KeycloakInstance } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  userDetails: KeycloakProfile;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiService: ApiService,
    private keycloakService: KeycloakService,
  ) {
    this.initializeApp();
    console.log(this.keycloakService);
    this.apiService.setUrl(APP_CONFIG.apiUrl);
  }

  async initializeApp() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
      console.log('userDetails');
      console.log(this.userDetails);
    } else {
      console.log('user not logged in');
    }
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
