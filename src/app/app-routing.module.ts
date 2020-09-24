import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// NOTE: we can't programmatically build the Routes array this way because the
// AOT compiler isn't recognizing it. We can update/run this in a console to
// generate the Routes array and then paste it in below.
// let pageModules = [
//   'home',
//   'dashboard',
//   'profile',
//   'housing-availables',
//   'properties',
//   'property-detail',
//   'property-edit',
//   'property-add',
//   'property-add-bulk',
//   'landlords',
//   'landlord-detail',
//   'landlord-edit',
//   'landlord-add',
//   'landlord-add-bulk',
//   'review-add',
// ];
//
// let pageRoutes = [];
// for (let mod of pageModules) {
//   let modClass = mod.split('-')
//     .map(part => part[0].toUpperCase() + part.slice(1)).join('');
//   pageRoutes.push({
//     path: '',
//     loadChildren: `_pages/${mod}/${mod}.module#${modClass}PageModule`
//   });
// }


let routes: Routes = [
  {
    "path": "",
    "loadChildren": "_pages/home/home.module#HomePageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/dashboard/dashboard.module#DashboardPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/profile/profile.module#ProfilePageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/properties/properties.module#PropertiesPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/property-detail/property-detail.module#PropertyDetailPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/property-edit/property-edit.module#PropertyEditPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/property-add/property-add.module#PropertyAddPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/property-add-bulk/property-add-bulk.module#PropertyAddBulkPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/landlords/landlords.module#LandlordsPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/landlord-detail/landlord-detail.module#LandlordDetailPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/landlord-edit/landlord-edit.module#LandlordEditPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/landlord-add/landlord-add.module#LandlordAddPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/landlord-add-bulk/landlord-add-bulk.module#LandlordAddBulkPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/review-add/review-add.module#ReviewAddPageModule"
  },
  {
    "path": "",
    "loadChildren": "_pages/housing-availables/housing-availables.module#HousingAvailablesPageModule"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false, // <-- debugging purposes only
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
