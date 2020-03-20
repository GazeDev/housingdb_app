import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
} from '@angular/material';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ActionSnackBarComponent } from './action-snack-bar/action-snack-bar';
import { PropertyCardComponent } from './property-card/property-card';
import { LandlordCardComponent } from './landlord-card/landlord-card';
import { LoadingBlockComponent } from './loading-block/loading-block';
import { NoContentComponent } from './no-content/no-content';
import { MapBoxComponent } from './map-box/map-box';
import { ReviewCardComponent } from './review-card/review-card';
import { StarsDisplayComponent } from './stars-display/stars-display';

@NgModule({
  declarations: [
    ActionSnackBarComponent,
    PropertyCardComponent,
    LandlordCardComponent,
    LoadingBlockComponent,
    MapBoxComponent,
    NoContentComponent,
    ReviewCardComponent,
    StarsDisplayComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: 'property-card',
        component: PropertyCardComponent,
      },
      {
        path: 'landlord-card',
        component: LandlordCardComponent,
      },
      {
        path: 'loading-block',
        component: LoadingBlockComponent,
      },
      {
        path: 'no-content',
        component: NoContentComponent,
      },
      {
        path: 'review-card',
        component: ReviewCardComponent,
      },
    ])
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    ActionSnackBarComponent,
    PropertyCardComponent,
    LandlordCardComponent,
    LoadingBlockComponent,
    MapBoxComponent,
    NoContentComponent,
    ReviewCardComponent,
    StarsDisplayComponent,
  ],
})
export class AngularMaterialModule {}
