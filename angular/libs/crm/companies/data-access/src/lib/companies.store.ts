import {
  patchState,
  signalStore,
  type,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Company } from './company.model';
import { withPersistence } from '@steffbeckers/shared/utils/ngrx-signals';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

export const CompaniesStore = signalStore(
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
  withMethods(
    (
      { maxResultCount, query, skipCount, sorting, ...store },
      companiesService = inject(CompaniesService)
    ) => ({
      getList: () => {
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
      },
    })
  ),
  withHooks({
    onInit({ query, sorting, getList }) {
      // TODO: Both rxMethod's trigger getList?
      rxMethod((x$) =>
        x$.pipe(
          debounceTime(250),
          distinctUntilChanged(),
          switchMap(() => getList())
        )
      )(query);

      rxMethod((x$) => x$.pipe(switchMap(() => getList())))(sorting);
    },
  })
);
