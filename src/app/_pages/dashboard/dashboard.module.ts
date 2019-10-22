import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardPage,
      }
    ])
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
