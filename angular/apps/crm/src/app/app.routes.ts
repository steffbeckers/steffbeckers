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
    path: 'contacts',
    loadChildren: () =>
      import('@steffbeckers/crm/contacts/feature').then(
        (m) => m.contactsRoutes
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'companies',
  },
];
