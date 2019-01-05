import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(
      private router: Router,
      public toastController: ToastController,
    ) {
        // clear alert message on route change
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    async error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        // this.subject.next({ type: 'error', text: message });
        const toast = await this.toastController.create({
          message: message,
          color: 'danger',
          showCloseButton: true,
        });
        toast.present();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
