import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef  } from '@angular/material';
import { Router } from '@angular/router';
import { ActionSnackData } from '_models/action-snack';


@Component({
  selector: 'action-snack-bar',
  templateUrl: './action-snack-bar.html',
  styleUrls: ['./action-snack-bar.scss'],
})
export class ActionSnackBarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ActionSnackData,
    private _snackRef: MatSnackBarRef<ActionSnackBarComponent>,
    private router: Router,
  ) {
    console.log('data', this.data);

    let actionData = new ActionSnackData();
    console.log('actionData', actionData);
    this.data = {...actionData, ...this.data};

    console.log('data', this.data);
  }

  action() {
    if (this.data.action.navigateTo) {
      this.router.navigate([this.data.action.navigateTo]);
    }
    this._snackRef.dismissWithAction();
  }

  dismiss() {
    this._snackRef.dismiss();
  }

}
