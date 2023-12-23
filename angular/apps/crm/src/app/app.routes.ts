import { authGuard } from '@abp/ng.core';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'companies',
    loadComponent: () =>
      import('@steffbeckers/crm/companies/feature').then(
        (m) => m.CompaniesComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'companies',
  },
];
