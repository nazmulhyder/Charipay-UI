import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [
{path:'**', component: LoginComponent},
{path:'login', component: LoginComponent},
{path: 'register', component: RegisterComponent}

];
