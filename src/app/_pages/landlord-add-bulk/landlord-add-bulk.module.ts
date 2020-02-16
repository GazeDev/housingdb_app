import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { Routes, RouterModule } from '@angular/router';

import { LandlordAddBulkPage } from './landlord-add-bulk.page';

const routes: Routes = [
  {
    path: 'landlords/add/bulk',
    component: LandlordAddBulkPage
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
  declarations: [LandlordAddBulkPage]
})
export class LandlordAddBulkPageModule {}
