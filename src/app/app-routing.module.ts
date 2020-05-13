import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

let pageModules = [
  'home',
  'dashboard',
  'profile',
  'properties',
  'property-detail',
  'property-edit',
  'property-add',
  'property-add-bulk',
  'landlords',
  'landlord-detail',
  'landlord-edit',
  'landlord-add',
  'landlord-add-bulk',
  'review-add',
];

let pageRoutes: Routes = [];
for (let mod of pageModules) {
  let modClass = mod.split('-')
    .map(part => part[0].toUpperCase() + part.slice(1)).join('');
  pageRoutes.push({
    path: '',
    loadChildren: `_pages/${mod}/${mod}.module#${modClass}PageModule`
  });
}

@NgModule({
  imports: [RouterModule.forRoot(
    pageRoutes,
    {
      enableTracing: false, // <-- debugging purposes only
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
