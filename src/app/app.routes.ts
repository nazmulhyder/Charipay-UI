import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PUBLIC_ROUTES } from './features/public/public-routing.module';
import { AUTH_ROUTES } from './features/auth/auth-routing.module';
import { ADMIN_ROUTES } from './features/admin/admin-routing.module';
import { DONOR_ROUTES } from './features/donor/donor-routing.module';
import { VOLUNTEER_ROUTES } from './features/volunteer/volunteer-routing.module';

export const routes: Routes = [
    {path:'', children:PUBLIC_ROUTES},
    {path:'auth', children:AUTH_ROUTES},
    {path:'admin', children: ADMIN_ROUTES},
    {path:'donor', children:DONOR_ROUTES},
    {path:'volunteer', children: VOLUNTEER_ROUTES},
    {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
