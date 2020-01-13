import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { Routes, RouterModule } from '@angular/router';

import { PropertyEditPage } from './property-edit.page';

const routes: Routes = [
  {
    path: 'property/:id/edit',
    component: PropertyEditPage
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
  declarations: [PropertyEditPage],
})
export class PropertyEditPageModule {}
