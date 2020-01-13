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
