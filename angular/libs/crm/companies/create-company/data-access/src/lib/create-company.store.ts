import { computed, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { signalStore, withComputed, withMethods } from '@ngrx/signals';
import {
  CompaniesService,
  CompanyCreateInputDto,
  CompanyDto,
} from '@steffbeckers/crm/data-access';
import { withForm, withPageTitle } from '@steffbeckers/shared/data-access';

export interface CreateCompanyForm {
  name: FormControl<string>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  website: FormControl<string | null>;
}

export const CreateCompanyStore = signalStore(
  withMethods((_, companiesService = inject(CompaniesService)) => ({
    formOnSave: (value) =>
      companiesService.create(value as CompanyCreateInputDto),
  })),
  withForm<CreateCompanyForm, CompanyDto>(),
  withComputed(({ formErrorResponse, formResponse, savingForm }) => ({
    vm: computed(() => ({
      formErrorResponse,
      formResponse,
      savingForm,
    })),
  })),
  withPageTitle(() => ({
    localizationKey: '::CreateNewX',
    params: ['CRM::Company'],
  }))
);
