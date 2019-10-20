import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { Routes, RouterModule } from '@angular/router';

import { PropertyDetailPage } from './property-detail.page';

const routes: Routes = [
  {
    path: 'property/:id',
    component: PropertyDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PropertyDetailPage]
})
export class PropertyDetailPageModule {}
