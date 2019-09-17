import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PropertyAddReviewsPage } from './property-add-reviews.page';

const routes: Routes = [
  {
    path: 'property/:id/add-reviews',
    component: PropertyAddReviewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PropertyAddReviewsPage]
})
export class PropertyAddReviewsPageModule {}
