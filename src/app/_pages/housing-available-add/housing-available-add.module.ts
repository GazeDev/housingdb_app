import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { Routes, RouterModule } from '@angular/router';

import { HousingAvailableAddPage } from './housing-available-add.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild([
      {
      path: 'housing-available/add',
      component: HousingAvailableAddPage
      }
    ])
  ],
  declarations: [HousingAvailableAddPage]
})
export class HousingAvailableAddPageModule {};
