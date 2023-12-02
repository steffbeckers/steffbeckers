import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'companies',
    loadComponent: () =>
      import('@steffbeckers/crm/companies/feature').then(
        (m) => m.CompanyListComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'companies',
  },
];
