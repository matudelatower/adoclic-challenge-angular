import { Routes } from '@angular/router';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    },
    // {
    //     path: '',
    //     redirectTo: 'login',
    //     pathMatch: 'full',
    // },
    {
        path: 'shopping',
        canActivate: [authGuard],
        loadComponent: () => import('./shopping/shopping.component').then((m) => m.ShoppingComponent),
    },
    { path: '**', redirectTo: 'login' }
];
