import { signalStore } from '@ngrx/signals';
import { DetailedCompany } from '@steffbeckers/crm/companies/data-access';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { withEntityDetail } from '@steffbeckers/shared/data-access';

export const CompanyDetailStore = signalStore(
  withEntityDetail<DetailedCompany, CompaniesService>(CompaniesService, {
    persistence: {
      name: 'sb-company-detail',
    },
  })
  // withPageTitle(({ entity }) => ({
  //   localizationKey: 'CRM::CompanyDetailPageTitle',
  //   params: [entity().name],
  // }))
);
