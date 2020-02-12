import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { Routes, RouterModule } from '@angular/router';

import { PropertyAddBulkPage } from './property-add-bulk.page';

const routes: Routes = [
  {
    path: 'properties/add/bulk',
    component: PropertyAddBulkPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PropertyAddBulkPage]
})
export class PropertyAddBulkPageModule {}
