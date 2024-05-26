import { signalStore } from '@ngrx/signals';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import {
  withEntityDetail,
  withPageTitle,
} from '@steffbeckers/shared/data-access';
import { DetailedCompany } from './company.model';

export const CompanyDetailStore = signalStore(
  withEntityDetail<DetailedCompany, CompaniesService>(CompaniesService, {
    persistence: {
      name: 'sb-company-detail',
    },
  }),
  withPageTitle(({ entity }) => ({
    localizationKey: 'CRM::CompanyDetailPageTitle',
    params: [entity().name],
  }))
);
