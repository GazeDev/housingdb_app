import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
