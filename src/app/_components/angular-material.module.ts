import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
} from '@angular/material';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IonicModule } from '@ionic/angular';
import { ActionSnackBarComponent } from './action-snack-bar/action-snack-bar';
import { PropertyCardComponent } from './property-card/property-card';
import { LandlordCardComponent } from './landlord-card/landlord-card';
import { StarsDisplayComponent } from './stars-display/stars-display';
import { TopBarComponent } from './top-bar/top-bar';

@NgModule({
  declarations: [
    ActionSnackBarComponent,
    PropertyCardComponent,
    LandlordCardComponent,
    StarsDisplayComponent,
    TopBarComponent,
  ],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatToolbarModule,
    CommonModule,
    IonicModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatToolbarModule,
    ActionSnackBarComponent,
    PropertyCardComponent,
    LandlordCardComponent,
    StarsDisplayComponent,
    TopBarComponent,
  ],
})
export class AngularMaterialModule {}
