import {
  patchState,
  signalStore,
  signalStoreFeature,
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
import { Company } from './company.model';

export type PersistenceOptions = {
  keyPrefix?: string;
  storage: Storage;
};

export const defaultPersistenceOptions: PersistenceOptions = {
  storage: localStorage,
};

// TODO: Move to shared util lib?
export const withPersistence = <T>(
  storageKey: string,
  keys: (keyof T)[],
  { keyPrefix, storage } = defaultPersistenceOptions
) =>
  signalStoreFeature(
    // TODO
    // { state: type<T> },
    withMethods((state) => ({
      load: () =>
        patchState(
          state,
          JSON.parse(storage.getItem(`${keyPrefix}${storageKey}`) ?? '{}')
        ),
      save: () =>
        storage.setItem(
          `${keyPrefix}${storageKey}`,
          JSON.stringify(
            keys.reduce((prev, curr) => {
              // TODO
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              prev[curr as string] = (state as any)[curr]();

              return prev;
            }, {} as { [key: string]: unknown })
          )
        ),
    })),
    withHooks({
      onInit({ load, save }) {
        load();
        effect(() => {
          save();
        });
      },
    })
  );

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
  withPersistence<State>('companies', ['entityMap', 'ids', 'query'], {
    storage: localStorage,
    keyPrefix: 'sb-',
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
