import {
  withEntitiesList,
  withPageTitle,
} from '@steffbeckers/shared/data-access';
import { Company } from './company.model';
import { signalStore } from '@ngrx/signals';
import { CompaniesService } from '@steffbeckers/crm/data-access';

export const CompaniesStore = signalStore(
  withEntitiesList<Company, CompaniesService>(CompaniesService, {
    persistence: {
      name: 'companies',
    },
  }),
  withPageTitle(() => ({
    localizationKey: 'CRM::Companies',
  }))
);
