import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
} from '@angular/material';

import { IonicModule } from '@ionic/angular';
import { PropertyCardComponent } from './property-card/property-card';
import { LandlordCardComponent } from './landlord-card/landlord-card';
import { StarsDisplayComponent } from './stars-display/stars-display';

@NgModule({
  declarations: [
    PropertyCardComponent,
    LandlordCardComponent,
    StarsDisplayComponent,
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
    LandlordCardComponent,
    StarsDisplayComponent,
  ],
})
export class AngularMaterialModule {}
