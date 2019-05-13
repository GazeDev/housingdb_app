import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  /**
   * The bearer prefix that will be appended to the Authorization Header.
   */
  public bearerPrefix: string;
  /**
   * Value that will be used as the Authorization Http Header name.
   */
  public authorizationHeaderName: string;

  constructor(
    private keycloak: KeycloakService
  ) {
    this.authorizationHeaderName = 'Authorization';
    this.bearerPrefix = 'bearer ';
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.conditionallyAddHeaders(request))
    .pipe(
      switchMap((newRequest) => {
        return next.handle(newRequest);
      })
    );
  }

  async conditionallyAddHeaders(request) {
    let authenticated = await this.keycloak.isLoggedIn();
    if (authenticated === true) {
      const token: string = await this.keycloak.getToken();
      const headers = request.headers.set(
        this.authorizationHeaderName,
        this.bearerPrefix + token
      );
      let clonedRequest = request.clone({
        headers
      });
      return clonedRequest;
    }
    return request;
  }

}
