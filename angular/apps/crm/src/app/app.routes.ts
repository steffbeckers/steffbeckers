import { authGuard as abpAuthGuard } from '@abp/ng.core';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'companies',
    loadChildren: () =>
      import('@steffbeckers/crm/companies/feature').then(
        (m) => m.companiesRoutes
      ),
    canActivate: [abpAuthGuard],
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('@steffbeckers/crm/contacts/feature').then(
        (m) => m.contactsRoutes
      ),
    canActivate: [abpAuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('@steffbeckers/crm/dashboard/feature').then(
        (m) => m.dashboardRoutes
      ),
    canActivate: [abpAuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
