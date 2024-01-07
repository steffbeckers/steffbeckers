import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { withPageTitle } from '@steffbeckers/shared/data-access';
import { tap } from 'rxjs';

export interface CreateCompanyForm {
  name: FormControl<string>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  website: FormControl<string | null>;
}

export const CreateCompanyStore = signalStore(
  withState({
    saving: false,
    formValue: {},
  }),
  withComputed(({ saving }) => ({
    vm: computed(() => ({
      saving,
    })),
  })),
  withMethods(
    (
      { saving, formValue, ...store },
      companiesService = inject(CompaniesService)
    ) => ({
      connectForm: (form: FormGroup) => {
        rxMethod<CreateCompanyForm>((x$) =>
          x$.pipe(
            takeUntilDestroyed(),
            tap((formValue) => patchState(store, { formValue }))
          )
        )(form.valueChanges);
      },
      formOnSubmit: (event: SubmitEvent, form: FormGroup) => {
        event.preventDefault();

        if (form.invalid || saving()) {
          return;
        }

        patchState(store, { saving: true });

        // TODO: Remove
        console.log('formValue', formValue());

        return (
          companiesService
            // TODO: Add create endpoint
            .getList({ maxResultCount: 10 })
            .pipe(
              tapResponse({
                next: console.log,
                error: console.error,
                finalize: () => {
                  patchState(store, { saving: false });
                },
              })
            )
            .subscribe()
        );
      },
    })
  ),
  withPageTitle(() => ({
    localizationKey: '::CreateNewX',
    params: ['CRM::Company'],
  }))
);
