import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LandlordDetailPage } from './landlord-detail.page';

const routes: Routes = [
  {
    path: 'landlord/:id',
    component: LandlordDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LandlordDetailPage]
})
export class LandlordDetailPageModule {}
