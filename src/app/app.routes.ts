import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PUBLIC_ROUTES } from './features/public/public-routing.module';
import { AUTH_ROUTES } from './features/auth/auth-routing.module';
import { ADMIN_ROUTES } from './features/admin/admin-routing.module';
import { DONOR_ROUTES } from './features/donor/donor-routing.module';
import { VOLUNTEER_ROUTES } from './features/volunteer/volunteer-routing.module';
import { PublicLayout } from './layout/public-layout/public-layout';
import { RoleGuard } from './core/guards/role.guard';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { VolunteerLayout } from './layout/volunteer-layout/volunteer-layout';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicRedirectGuard } from './core/guards/PublicRedirectGuard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
  canActivate: [PublicRedirectGuard],
    children: PUBLIC_ROUTES
  },

  {
    path: 'auth',
    component: AuthLayout,
    children: AUTH_ROUTES
  },

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' },
    children: ADMIN_ROUTES
  },

  {
    path: 'donor',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Donor' },
    children: DONOR_ROUTES
  },

  {
    path: 'volunteer',
    component: VolunteerLayout,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Volunteer' },
    children: VOLUNTEER_ROUTES
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration : 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
