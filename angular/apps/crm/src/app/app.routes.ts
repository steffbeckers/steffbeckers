import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@steffbeckers/crm/companies/feature').then(
        (m) => m.CompanyListComponent
      ),
  },
];
