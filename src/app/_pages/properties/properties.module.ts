import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';

import { PropertiesPage } from './properties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: 'properties',
        component: PropertiesPage
      }
    ])
  ],
  declarations: [PropertiesPage]
})
export class PropertiesPageModule {}
