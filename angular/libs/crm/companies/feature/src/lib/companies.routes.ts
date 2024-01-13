import { Routes } from '@angular/router';

export const companiesRoutes: Routes = [
  {
    path: 'create',
    loadComponent: () =>
      import('./create-company/create-company.component').then(
        (m) => m.CreateCompanyComponent
      ),
  },
  {
    path: ':companyId/update',
    loadComponent: () =>
      import('./update-company/update-company.component').then(
        (m) => m.UpdateCompanyComponent
      ),
  },
  {
    path: ':companyId',
    loadComponent: () =>
      import('./company-detail/company-detail.component').then(
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
