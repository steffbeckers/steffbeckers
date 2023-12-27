import { withEntitiesList } from '@steffbeckers/shared/data-access';
import { CompaniesDataService } from './companies.data-service';
import { Company } from './company.model';
import { signalStore } from '@ngrx/signals';

export const CompaniesStore = signalStore(
  withEntitiesList<Company, CompaniesDataService>(CompaniesDataService, {
    persistence: {
      name: 'companies',
    },
  })
);
