import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
  ]
})
export class AngularMaterialModule {}
