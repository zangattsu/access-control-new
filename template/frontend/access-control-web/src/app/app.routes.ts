import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/auth.guard';
import { LoginCallbackComponent } from './features/auth/login-callback/login-callback.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginCallbackComponent },
  // Outras rotas protegidas
//   { 
//     path: 'dashboard', 
//     loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
//     canActivate: [authGuard]
//   },
  { path: '**', redirectTo: '' }
];
