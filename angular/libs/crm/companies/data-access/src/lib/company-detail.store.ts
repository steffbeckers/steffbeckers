import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setEntity, withEntities } from '@ngrx/signals/entities';
import { computed, inject } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withPersistence } from '@steffbeckers/shared/utils/ngrx-signals';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DetailedCompany } from './company.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const CompanyDetailStore = signalStore(
  withState({
    errorMessage: '',
    id: '',
    loading: false,
  }),
  withEntities({ entity: type<DetailedCompany>() }),
  withPersistence('company-detail', {
    excludedKeys: ['loading'],
    keyPrefix: 'sb-',
  }),
  withComputed(({ entityMap, id, errorMessage, loading }) => ({
    vm: computed(() => ({
      company: computed(() => entityMap()[id()]),
      errorMessage,
      loading,
    })),
  })),
  withMethods(
    ({ id, ...store }, companiesService = inject(CompaniesService)) => ({
      get: () => {
        patchState(store, { loading: true });

        return companiesService.get(id()).pipe(
          tapResponse({
            next: (data) => {
              patchState(store, setEntity(data as DetailedCompany));
              patchState(store, { errorMessage: '' });
            },
            error: (response: HttpErrorResponse) =>
              patchState(store, {
                errorMessage: response.error.error.message,
              }),
            finalize: () => patchState(store, { loading: false }),
          })
        );
      },
    })
  ),
  withHooks({
    onInit({ get, id, ...store }, activatedRoute = inject(ActivatedRoute)) {
      activatedRoute.paramMap
        .pipe(
          takeUntilDestroyed(),
          map((paramMap) =>
            patchState(store, { id: paramMap.get('companyId') ?? '' })
          )
        )
        .subscribe();

      // Retrieve detail based on triggers
      rxMethod((x$) => x$.pipe(switchMap(() => get())))(id);
    },
  })
);
