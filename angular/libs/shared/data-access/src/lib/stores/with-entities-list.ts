import { HttpErrorResponse } from '@angular/common/http';
import { Type, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  type,
  withState,
  withComputed,
  withHooks,
  withMethods,
  patchState,
  signalStoreFeature,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  PersistenceConfig,
  withPersistence,
} from '@steffbeckers/shared/data-access';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  merge,
  skip,
  switchMap,
} from 'rxjs';
import { Entity } from './entity';

export interface EntityListInputDto {
  maxResultCount: number;
  query: string;
  skipCount: number;
  sorting: string;
}

export interface EntityListDto {
  totalCount?: number;
  items?: unknown[];
}

export interface EntitiesDataService {
  getList(input: EntityListInputDto): Observable<EntityListDto>;
}

export function withEntitiesList<
  TEntity extends Entity,
  TDataService extends EntitiesDataService
>(
  dataServiceType: Type<TDataService>,
  config: {
    initialState?: {
      sorting?: string;
    };
    getListOnInit?: boolean;
    persistence: {
      name: string;
      config?: Partial<PersistenceConfig>;
    };
  }
) {
  config.getListOnInit ??= true;
  config.persistence.config ??= {};
  config.persistence.config.excludedKeys ??= [
    'loading',
    'maxResultCount',
    'skipCount',
  ];

  return signalStoreFeature(
    withState({
      errorMessage: '',
      loading: false,
      maxResultCount: 10,
      query: '',
      skipCount: 0,
      sorting: config.initialState?.sorting ?? 'Name ASC',
    }),
    withEntities({ entity: type<TEntity>() }),
    withPersistence(config.persistence.name, config.persistence.config),
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
        dataService = inject(dataServiceType)
      ) => ({
        queryChanged: (query: string) => patchState(store, { query }),
        sortingChanged: (sorting: string) => patchState(store, { sorting }),
        getList: () => {
          patchState(store, { loading: true });

          return dataService
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
                    setAllEntities((data.items ?? []) as TEntity[])
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
        if (config.getListOnInit) {
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
        }
      },
    })
  );
}
