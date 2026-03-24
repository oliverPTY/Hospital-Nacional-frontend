import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./view/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./view/login/login.page').then((m) => m.LoginPage),
  },
];
