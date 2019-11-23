import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { Routes, RouterModule } from '@angular/router';

import { LandlordEditPage } from './landlord-edit.page';

const routes: Routes = [
  {
    path: 'landlord/:id/edit',
    component: LandlordEditPage
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
  declarations: [LandlordEditPage]
})
export class LandlordEditPageModule {}
