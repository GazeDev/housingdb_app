import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';

import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private accountUrl: any;

  constructor(
    private apiService: ApiService,
    // private keycloakInstance: Keycloak,
    private keycloakService: KeycloakService,
  ) {

  }

  async doLogin() {
    await this.keycloakService.login();
  }

  async doLogout() {
    await this.keycloakService.logout();
  }

  async accountManagement() {
    await this.keycloakService.getKeycloakInstance().accountManagement();
    // let url = await this.keycloakService.getKeycloakInstance().createAccountUrl();
    // window.open(url, '_blank');
  }

}
