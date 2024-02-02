import { computed, effect, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  CompaniesService,
  CompanyCreateInputDto,
  CompanyDto,
} from '@steffbeckers/crm/data-access';
import {
  ExtractFormControl,
  withEntityDetail,
  withForm,
  withPageTitle,
} from '@steffbeckers/shared/data-access';
import { DetailedCompany } from './company.model';

export interface UpdateCompanyForm {
  name: FormControl<string>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  website: FormControl<string | null>;
}

export const UpdateCompanyStore = signalStore(
  withEntityDetail<DetailedCompany, CompaniesService>(CompaniesService, {
    entityIdRouteParam: 'companyId',
    persistence: {
      name: 'sb-company-detail',
    },
  }),
  withMethods(({ entity }, companiesService = inject(CompaniesService)) => ({
    formOnSave: (value) =>
      companiesService.update(entity().id, value as CompanyCreateInputDto),
  })),
  withForm<UpdateCompanyForm, CompanyDto>(),
  withComputed(({ entity, formErrorResponse, savingForm }) => ({
    vm: computed(() => ({
      entity,
      formErrorResponse,
      savingForm,
    })),
  })),
  withPageTitle(() => ({
    localizationKey: '::CreateNewX',
    params: ['CRM::Company'],
  })),
  withHooks({
    onInit: ({ entity, ...store }) => {
      effect(
        () => {
          patchState(store, {
            formValue: entity() as ExtractFormControl<UpdateCompanyForm>,
          });
        },
        { allowSignalWrites: true }
      );
    },
  })
);
