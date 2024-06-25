import { Company } from '@steffbeckers/crm/companies/data-access';

export interface DetailedCompany extends Company {
  email?: string;
  phoneNumber?: string;
  website?: string;
}
