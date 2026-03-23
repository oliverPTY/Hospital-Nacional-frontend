import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./view/dashboard/dashboard.page').then(m => m.DashboardPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./view/login/login.page').then(m => m.LoginPage)
    }
];
