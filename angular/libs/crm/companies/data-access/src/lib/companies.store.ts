import {
  patchState,
  signalStore,
  type,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { effect, inject } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  from,
  switchMap,
} from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access/proxy/crm/companies';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export interface Company {
  id: string;
  name: string;
}

export const CompaniesStore = signalStore(
  withState({
    query: '',
  }),
  withEntities({ entity: type<Company>() }),
  withMethods(
    ({ query, ...state }, companiesService = inject(CompaniesService)) => ({
      getList: async () => {
        const data = await firstValueFrom(
          companiesService.getList({
            maxResultCount: 10,
            query: query(),
          })
        );

        patchState(state, setAllEntities((data.items ?? []) as Company[]));
      },
    })
  ),
  withMethods(({ getList }) => ({
    connectQuery: rxMethod<string>((query$) =>
      query$.pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(() => from(getList()))
      )
    ),
  })),
  withHooks({
    onInit({ getList, connectQuery, ...state }) {
      // TODO: This is a temp storage test
      // Load from storage
      const storagePrefix = 'sb-companies';
      patchState(state, {
        entityMap: JSON.parse(
          localStorage.getItem(`${storagePrefix}-entityMap`) ?? '{}'
        ),
        ids: JSON.parse(localStorage.getItem(`${storagePrefix}-ids`) ?? '[]'),
        query: localStorage.getItem(`${storagePrefix}-query`)!,
      });
      // Save to storage
      effect(() => {
        localStorage.setItem(
          `${storagePrefix}-entityMap`,
          JSON.stringify(state.entityMap())
        );
        localStorage.setItem(
          `${storagePrefix}-ids`,
          JSON.stringify(state.ids())
        );
        localStorage.setItem(`${storagePrefix}-query`, state.query());
      });

      getList();
      connectQuery(state.query);
    },
  })
);
