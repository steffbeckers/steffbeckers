import { computed, effect, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { ActivatedRoute, Router } from '@angular/router';

export interface UpdateCompanyForm {
  name: FormControl<string>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  website: FormControl<string | null>;
}

export const UpdateCompanyStore = signalStore(
  withEntityDetail<DetailedCompany, CompaniesService>(CompaniesService, {
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
  withPageTitle(({ entity }) => ({
    localizationKey: '::UpdateXY',
    params: ['CRM::Company', entity().name],
  })),
  withHooks({
    onInit: (
      { entity, formResponse, ...store },
      router = inject(Router),
      activatedRoute = inject(ActivatedRoute)
    ) => {
      // Fill entity in form
      effect(
        () => {
          patchState(store, {
            formValue: entity() as ExtractFormControl<UpdateCompanyForm>,
          });
        },
        { allowSignalWrites: true }
      );

      // Redirect to company detail
      effect(() => {
        const companyDto = formResponse();
        if (companyDto?.id) {
          router.navigate(['..'], {
            relativeTo: activatedRoute,
          });
        }
      });
    },
  })
);
