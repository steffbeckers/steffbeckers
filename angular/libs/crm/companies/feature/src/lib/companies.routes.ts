import { Routes } from '@angular/router';

export const companiesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./companies/companies.component').then(
        (m) => m.CompaniesComponent
      ),
  },
  {
    path: ':companyId',
    loadComponent: () =>
      import('./company-detail/company-detail.component').then(
        (m) => m.CompanyDetailComponent
      ),
  },
];
