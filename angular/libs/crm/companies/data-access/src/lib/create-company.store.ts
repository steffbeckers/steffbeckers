import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { withPageTitle } from '@steffbeckers/shared/data-access';

export const CreateCompanyStore = signalStore(
  withState({
    executing: false,
  }),
  withMethods(
    ({ executing, ...store }, companiesService = inject(CompaniesService)) => ({
      execute: () => {
        if (executing()) {
          return;
        }

        patchState(store, { executing: true });

        return companiesService.getList({ maxResultCount: 10 }).pipe(
          tapResponse({
            next: console.log,
            error: console.error,
            finalize: () => {
              patchState(store, { executing: false });
            },
          })
        );
      },
    })
  ),
  withPageTitle(() => ({
    localizationKey: 'CRM::CreateCompanyPageTitle',
  }))
);
