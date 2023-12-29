import { Signal, Type, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  type,
  withState,
  withComputed,
  withMethods,
  signalStoreFeature,
  patchState,
  withHooks,
} from '@ngrx/signals';
import { setEntity, withEntities } from '@ngrx/signals/entities';
import { withPersistence } from '@steffbeckers/shared/data-access';
import { Observable, map, of, switchMap } from 'rxjs';
import { Entity } from './entity';
import { ActivatedRoute } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export interface EntityDataService {
  get(id: string): Observable<unknown>;
}

export const withEntityDetail = <
  TEntity extends Entity,
  TDataService extends EntityDataService
>(
  dataServiceType: Type<TDataService>,
  config: {
    entityIdRouteParam: string;
    persistence: { name: string };
  }
) => {
  return signalStoreFeature(
    withState({
      errorMessage: '',
      loading: false,
    }),
    withEntities({ entity: type<TEntity>() }),
    withPersistence(config.persistence.name, {
      excludedKeys: ['loading'],
      keyPrefix: 'sb-',
    }),
    withComputed((_, activatedRoute = inject(ActivatedRoute)) => ({
      id: toSignal(
        activatedRoute.paramMap.pipe(
          map((paramMap) => paramMap.get(config.entityIdRouteParam))
        )
      ) as Signal<string>,
    })),
    withComputed(({ entityMap, id }) => ({
      entity: computed(() => entityMap()[id()] ?? {}),
    })),
    withComputed(({ entity, errorMessage, loading }) => ({
      vm: computed(() => ({
        entity,
        errorMessage,
        loading,
      })),
    }))
    // TODO: Adding any method breaks typing?
    // withMethods(() => ({
    //   get: () => {
    //     console.log('');
    //   },
    // }))
    // withMethods(({ id, ...store }, dataService = inject(dataServiceType)) => ({
    //   get: () => {
    //     patchState(store, { loading: true });

    //     return dataService.get(id()).pipe(
    //       tapResponse({
    //         next: (data) => {
    //           patchState(store, setEntity(data as TEntity));
    //           patchState(store, { errorMessage: '' });
    //         },
    //         error: (response: HttpErrorResponse) =>
    //           patchState(store, {
    //             errorMessage: response.error.error.message,
    //           }),
    //         finalize: () => patchState(store, { loading: false }),
    //       })
    //     );
    //   },
    // })),
    // withHooks({
    //   onInit({ get, id }) {
    //     // Retrieve detail based on id
    //     rxMethod((x$) => x$.pipe(switchMap(() => get())))(id);
    //   },
    // })
  );
};
