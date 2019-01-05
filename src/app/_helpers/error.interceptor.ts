import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '_services/authentication.service';
import { AlertService } from '_services/alert.service';
import { ApiService } from '_services/api.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private authenticationService: AuthenticationService,
      private httpClient: HttpClient,
      private alertService: AlertService,
      private apiService: ApiService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('request');
      console.log(request);
      // const url = new URL(request.url);
      // console.log(url.pathname);
      // if (url.pathname == '/') {
      //   // don't do error checking for status request
      //   return next.handle(request);
      // }

      return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          location.reload(true);
        }

        let avoidFurtherAlerts = false;

        if (err.status === 0) {
          avoidFurtherAlerts = true;
          this.alertService.error("The request was cancelled. The API is probably not running.");
        }

        const error = err.error.message || err.message || err.statusText;
        if (!avoidFurtherAlerts) {
          this.alertService.error(error);
        }

        return throwError(error);

      }));
    }
}
