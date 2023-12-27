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
import { toObservable } from '@angular/core/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  merge,
  skip,
  switchMap,
} from 'rxjs';
import { ContactsService } from '@steffbeckers/crm/data-access';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withPersistence } from '@steffbeckers/shared/data-access';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Contact } from './contact.model';
import { LocalizationService as AbpLocalizationService } from '@abp/ng.core';
import { PageTitleService } from '@steffbeckers/shared/utils/page-title';

export const ContactsStore = signalStore(
  withState({
    errorMessage: '',
    loading: false,
    maxResultCount: 10,
    query: '',
    skipCount: 0,
    sorting: 'FirstName ASC',
  }),
  withEntities({ entity: type<Contact>() }),
  withPersistence('contacts', {
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
      contactsService = inject(ContactsService)
    ) => ({
      queryChanged: (query: string) => patchState(store, { query }),
      sortingChanged: (sorting: string) => patchState(store, { sorting }),
      getList: () => {
        patchState(store, { loading: true });

        return contactsService
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
                  setAllEntities((data.items ?? []) as Contact[])
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
    onInit({ getList, query, sorting }) {
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
    },
  }),
  // TODO: This is entity specific
  withHooks({
    onInit(
      _,
      abpLocalizationService = inject(AbpLocalizationService),
      pageTitleService = inject(PageTitleService)
    ) {
      // Update page title
      pageTitleService.setTitle(
        abpLocalizationService.instant('CRM::Contacts')
      );
    },
  })
);
