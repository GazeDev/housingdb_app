import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
} from '@angular/material';

import { IonicModule } from '@ionic/angular';
import { PropertyCardComponent } from './property-card/property-card';

@NgModule({
  declarations: [
    PropertyCardComponent,
  ],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    CommonModule,
    IonicModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    PropertyCardComponent,
  ],
})
export class AngularMaterialModule {}
