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
import { computed, effect, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  merge,
  skip,
  switchMap,
} from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withPersistence } from '@steffbeckers/shared/utils/ngrx-signals';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Company } from './company.model';
import { Title } from '@angular/platform-browser';
import { LocalizationService as AbpLocalizationService } from '@abp/ng.core';

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
  }),
  withComputed(({ entities, errorMessage, loading, sorting, query }) => ({
    vm: computed(() => ({
      entities,
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
    ) => ({
      queryChanged: (query: string) => patchState(store, { query }),
      sortingChanged: (sorting: string) => patchState(store, { sorting }),
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
    onInit(
      { getList, query, sorting },
      abpLocalizationService = inject(AbpLocalizationService),
      title = inject(Title)
    ) {
      // Retrieve list based on triggers
      rxMethod((x$) => x$.pipe(switchMap(() => getList())))(
        merge(
          toObservable(query).pipe(
            skip(1),
            debounceTime(250),
            distinctUntilChanged()
          ),
          toObservable(sorting)
        )
      );

      // Update page title
      effect(() => {
        title.setTitle(
          // TODO: "CRM - " in global => own title service?
          `CRM - ${abpLocalizationService.instant('CRM::Companies')}`
        );
      });
    },
  })
);
