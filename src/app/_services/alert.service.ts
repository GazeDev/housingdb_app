import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionSnackBarComponent } from '_components/action-snack-bar/action-snack-bar';
import { ActionSnackConfig } from '_models/action-snack';

@Injectable()
export class AlertService {

    constructor(
      private snackBar: MatSnackBar,
    ) {

    }

    action(config: ActionSnackConfig) {
      this.snackBar.openFromComponent(ActionSnackBarComponent, config);
    }

    success(message: string) {
      this.action({
        data: {
          message: message,
        }
      });
    }

    error(message: string) {
      this.action({
        data: {
          message: message,
        }
      });
    }

}
