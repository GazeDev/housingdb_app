import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from '_helpers/index';
import { AlertService, AuthenticationService } from '_services/index';
import { ActionSnackBarComponent } from '_components/action-snack-bar/action-snack-bar';

import { AngularMaterialModule } from '_components/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { OverlayContainer } from '@angular/cdk/overlay';

import { APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from '_utils/app-init';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    ActionSnackBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
  ],
  providers: [
    // AuthGuard,
    AlertService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    // overlayContainer: OverlayContainer
  ) {
    // overlayContainer.getContainerElement().classList.add('app-dark');
  }
}
