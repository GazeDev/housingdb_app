import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LandlordsPage } from './landlords.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: 'landlords',
        component: LandlordsPage
      }
    ])
  ],
  declarations: [LandlordsPage]
})
export class LandlordsPageModule {}
