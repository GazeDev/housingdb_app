import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from '_services/api.service';
import { AlertService } from './alert.service';

@Injectable()
export class AuthenticationService {

    public isAuthenticated: boolean;

    public userDetails: KeycloakProfile;

    constructor(
      private http: HttpClient,
      private keycloakService: KeycloakService,
      private apiService: ApiService,
      private alertService: AlertService,
    ) {
      this.isAuthenticated = false;
    }

    async init() {
      await this.checkLogin();
      if (this.isAuthenticated) {
        await this.getUserInfo();
        let observeResponse = true;
        this.apiService.getAccount(observeResponse).subscribe(
          response => {},
          error => {
            if (error.status === 404) {
              this.apiService.createAccount().subscribe(
                async success => {
                  this.alertService.success('We have created an account for you. Welcome!');
                },
                error => {
                  console.log("Error when calling createAccount(): ", error)
                }
              );
            }
          }
        );
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
