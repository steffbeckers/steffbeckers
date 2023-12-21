import {
  patchState,
  signalStore,
  type,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  EntityState,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  from,
  switchMap,
} from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Company } from './company.model';
import { withPersistence } from '@steffbeckers/shared/utils/ngrx-signals';

export interface State extends EntityState<Company> {
  query: string;
}

export const CompaniesStore = signalStore(
  withState<State>({
    entityMap: {},
    ids: [],
    query: '',
  }),
  withEntities({ entity: type<Company>() }),
  withPersistence<State>('companies', ['query', 'entityMap', 'ids'], {
    keyPrefix: 'sb-',
    rehydrate: true,
  }),
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
    onInit({ getList, query, connectQuery }) {
      getList();

      connectQuery(query);
    },
  })
);
