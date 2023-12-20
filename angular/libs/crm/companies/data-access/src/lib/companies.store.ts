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
  from,
  switchMap,
} from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access/proxy/crm/companies';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export interface Company {
  id: string;
  name: string;
}

export interface State {
  query: string;
}

export const CompaniesStore = signalStore(
  withState<State>({
    query: '',
  }),
  withEntities({ entity: type<Company>() }),
  withComputed(({ entities, query }) => ({
    vm: computed(() => ({
      entities,
      query,
    })),
  })),
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
      queryChanged: (query: string) => {
        patchState(state, { query });
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
    onInit({ getList, query, connectQuery }) {
      getList();
      connectQuery(query);
    },
  })
);
