import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthenticationService {

    public isAuthenticated: boolean;

    public userDetails: KeycloakProfile;

    constructor(
      private http: HttpClient,
      private keycloakService: KeycloakService,
    ) {
      this.isAuthenticated = false;
    }

    async init() {
      await this.checkLogin();
      if (this.isAuthenticated) {
        await this.getUserInfo();
      }
    }

    async checkLogin() {
      this.isAuthenticated = await this.keycloakService.isLoggedIn();
    }

    async getUserInfo() {
      this.userDetails = await this.keycloakService.loadUserProfile();
    }

    login() {
      this.keycloakService.login();
    }

    logout() {
      this.keycloakService.logout();
    }

    account() {
      this.keycloakService.getKeycloakInstance().accountManagement();
    }
}
