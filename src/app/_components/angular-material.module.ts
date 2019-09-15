import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
} from '@angular/material';

// import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

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
    // MatCardModule,
    MatExpansionModule,
    CommonModule,
    IonicModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    // MatCardModule,
    MatExpansionModule,
    PropertyCardComponent,
    LandlordCardComponent,
    StarsDisplayComponent,
  ],
})
export class AngularMaterialModule {}
