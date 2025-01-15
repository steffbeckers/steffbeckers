import { inject, resource } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  patchState,
  signalStore,
  signalStoreFeature,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { firstValueFrom } from 'rxjs';

const withForm = signalStoreFeature(
  withProps((_, fb = inject(FormBuilder)) => ({
    form: fb.group({
      name: 'Test name',
      phoneNumber: '',
      email: '',
      website: '',
    }),
  })),
  withMethods(() => ({
    cancel(): void {
      console.log('cancel');
    },
    submit(): void {
      console.log('submit');
    },
  }))
);

export const UpdateCompanyStore = signalStore(
  withForm,
  withState({ id: '' }),
  withMethods((store) => ({
    setId(id: string): void {
      patchState(store, { id });
    },
  })),
  withProps(({ id }, companiesService = inject(CompaniesService)) => ({
    company: resource({
      request: () => ({ id: id() }),
      loader: ({ request }) => firstValueFrom(companiesService.get(request.id)),
    }),
  })),
  withMethods(({ form }) => ({
    save(): void {
      console.log('save');
    },
  }))
);
