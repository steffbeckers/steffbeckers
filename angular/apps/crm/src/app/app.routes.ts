import { authGuard } from '@abp/ng.core';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'companies',
    loadChildren: () =>
      import('@steffbeckers/crm/companies/feature').then(
        (m) => m.companiesRoutes
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'companies',
  },
];
