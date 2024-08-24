import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'country/:code',
    loadComponent: () =>
      import('./country/country.component').then(c => c.CountryComponent),
  },
];
