import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LandlordsPage } from './landlords.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
