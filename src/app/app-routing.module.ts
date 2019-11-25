import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: '_pages/home/home.module#HomePageModule' },
  { path: '', loadChildren: '_pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: '', loadChildren: '_pages/properties/properties.module#PropertiesPageModule' },
  { path: '', loadChildren: '_pages/property-detail/property-detail.module#PropertyDetailPageModule' },
  { path: '', loadChildren: '_pages/property-add/property-add.module#PropertyAddPageModule' },
  // { path: '', loadChildren: '_pages/property-detail/property-detail.module#PropertyDetailPageModule' },
  { path: '', loadChildren: '_pages/landlords/landlords.module#LandlordsPageModule' },
  { path: '', loadChildren: '_pages/landlord-detail/landlord-detail.module#LandlordDetailPageModule' },
  { path: '', loadChildren: '_pages/landlord-edit/landlord-edit.module#LandlordEditPageModule' },
  { path: '', loadChildren: '_pages/landlord-add/landlord-add.module#LandlordAddPageModule' },
  { path: '', loadChildren: '_pages/landlord-add-reviews/landlord-add-reviews.module#LandlordAddReviewsPageModule' },
  { path: '', loadChildren: '_pages/property-add-reviews/property-add-reviews.module#PropertyAddReviewsPageModule' },

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
