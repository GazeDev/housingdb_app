import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';

import { HousingAvailablesPage } from './housing-availables.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild([
      {
        path: 'housing-availables',
        component: HousingAvailablesPage
      }
    ])
  ],
  declarations: [HousingAvailablesPage]
})
export class HousingAvailablesPageModule {}
