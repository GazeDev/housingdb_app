import { MatSnackBarConfig } from '@angular/material/snack-bar';

export class ActionSnackData {
  public action?: {
    text: string,
    navigateTo?: string,
  };
  public message: string;
  public close?: string = "Close";

  constructor (

  ) {
    this.close = "Close";
  }
}

export class ActionSnackConfig extends MatSnackBarConfig {

  public data: ActionSnackData;

  constructor (

  ) {
    super();
  }
}
