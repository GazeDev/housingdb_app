import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { Routes, RouterModule } from '@angular/router';

import { HousingAvailableAddPage } from './housing-available-add.page';

const routes: Routes = [
  {
    path: 'housing-available-add',
    component: HousingAvailableAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
    // TODO: add path, component;
  ],
  declarations: [HousingAvailableAddPage]
})
export class HousingAvailableAddPageModule {}
