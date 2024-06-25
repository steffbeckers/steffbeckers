import { Routes } from '@angular/router';

export const companiesRoutes: Routes = [
  {
    path: 'create',
    loadComponent: () =>
      import('@steffbeckers/crm/companies/create-company/feature').then(
        (m) => m.CreateCompanyComponent
      ),
  },
  {
    path: ':id/update',
    loadComponent: () =>
      import('@steffbeckers/crm/companies/update-company/feature').then(
        (m) => m.UpdateCompanyComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@steffbeckers/crm/companies/company-detail/feature').then(
        (m) => m.CompanyDetailComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./companies/companies.component').then(
        (m) => m.CompaniesComponent
      ),
  },
];
