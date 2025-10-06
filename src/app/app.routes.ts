import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PUBLIC_ROUTES } from './features/public/public-routing.module';
import { AUTH_ROUTES } from './features/auth/auth-routing.module';
import { ADMIN_ROUTES } from './features/admin/admin-routing.module';
import { DONOR_ROUTES } from './features/donor/donor-routing.module';
import { VOLUNTEER_ROUTES } from './features/volunteer/volunteer-routing.module';
import { PublicLayout } from '../layout/public-layout/public-layout';
import { RoleGuard } from './core/guards/role.guard';
import { AuthLayout } from '../layout/auth-layout/auth-layout';
import { AdminLayout } from '../layout/admin-layout/admin-layout';

export const routes: Routes = [

  // public pages (nav + footer)
    {
      path:'', component: PublicLayout,
      children: [
        ...PUBLIC_ROUTES,
     
    //donor area
    {
      path:'donor',
      canActivate : [RoleGuard],
      data: {role:'Donor'},
      children:DONOR_ROUTES
    },
    {
      path:'volunteer', 
      canActivate: [RoleGuard],
      data : {role : 'Volunteer'},
      children: VOLUNTEER_ROUTES
    }
  ]
},

  // auth pages (no nav + footer)
  {
    path:'auth', 
    component: AuthLayout,
    children:AUTH_ROUTES
  },

  // admin section (sidebar + topbar)
  {
    path:'admin', 
    component: AdminLayout,
    canActivate: [RoleGuard],
    data : {role: 'Admin'},  
    children: ADMIN_ROUTES
  },
  // fallback
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration : 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
