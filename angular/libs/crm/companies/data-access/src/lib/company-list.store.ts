import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { computed, inject } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  switchMap,
} from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withPersistence } from '@steffbeckers/shared/utils/ngrx-signals';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Company } from './company.model';

export const CompanyListStore = signalStore(
  withState({
    errorMessage: '',
    loading: false,
    maxResultCount: 10,
    query: '',
    skipCount: 0,
    sorting: 'Name ASC',
  }),
  withEntities({ entity: type<Company>() }),
  withPersistence('companies', {
    excludedKeys: ['loading', 'maxResultCount', 'skipCount'],
    keyPrefix: 'sb-',
    rehydrate: true,
  }),
  withComputed(({ entities, errorMessage, loading, sorting, query }) => ({
    vm: computed(() => ({
      companies: entities,
      errorMessage,
      loading,
      query,
      sorting,
    })),
  })),
  withMethods(
    (
      { maxResultCount, query, skipCount, sorting, ...store },
      companiesService = inject(CompaniesService)
    ) => {
      const getList = () => {
        patchState(store, { loading: true });

        return companiesService
          .getList({
            maxResultCount: maxResultCount(),
            query: query(),
            skipCount: skipCount(),
            sorting: sorting(),
          })
          .pipe(
            tapResponse({
              next: (data) => {
                patchState(
                  store,
                  setAllEntities((data.items ?? []) as Company[])
                );
                patchState(store, { errorMessage: '' });
              },
              error: (response: HttpErrorResponse) =>
                patchState(store, {
                  errorMessage: response.error.error.message,
                }),
              finalize: () => patchState(store, { loading: false }),
            })
          );
      };

      return {
        getList,
        queryChanged: (query: string) => patchState(store, { query }),
        // TODO: Bit weird to be a Promise?
        sortingChanged: async (sorting: string) => {
          patchState(store, { sorting });
          await firstValueFrom(getList());
        },
      };
    }
  ),
  withHooks({
    onInit({ getList, query }) {
      rxMethod((x$) =>
        x$.pipe(
          debounceTime(250),
          distinctUntilChanged(),
          switchMap(() => getList())
        )
      )(query);
    },
  })
);
