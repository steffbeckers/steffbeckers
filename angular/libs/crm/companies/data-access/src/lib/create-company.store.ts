import { computed, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { signalStore, withComputed, withMethods } from '@ngrx/signals';
import {
  CompaniesService,
  CompanyCreateInputDto,
} from '@steffbeckers/crm/data-access';
import { withForm, withPageTitle } from '@steffbeckers/shared/data-access';

export interface CreateCompanyForm {
  name: FormControl<string>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  website: FormControl<string | null>;
}

type ExtractFormControl<T> = {
  [K in keyof T]: T[K] extends FormControl<infer U> ? U : T[K];
};

export const CreateCompanyStore = signalStore(
  withMethods((_, companiesService = inject(CompaniesService)) => ({
    formOnSave: (value: ExtractFormControl<CreateCompanyForm>) =>
      companiesService.create(value as CompanyCreateInputDto),
  })),
  withForm(),
  withComputed(({ savingForm }) => ({
    vm: computed(() => ({
      savingForm,
    })),
  })),
  withPageTitle(() => ({
    localizationKey: '::CreateNewX',
    params: ['CRM::Company'],
  }))
);
