import { Signal, Type, computed, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
import { Observable, map, switchMap } from 'rxjs';
import { Entity } from './entity';
import { ActivatedRoute } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PersistenceConfig, withPersistence } from './with-persistence';

export interface EntityDataService {
  get(id: string): Observable<unknown>;
}

export function withEntityDetail<
  TEntity extends Entity,
  TDataService extends EntityDataService
>(
  dataServiceType: Type<TDataService>,
  config: {
    entityIdRouteParam: string;
    getOnInit?: boolean;
    persistence?: {
      name?: string;
      config?: Partial<PersistenceConfig>;
    };
  }
) {
  config.getOnInit ??= true;
  config.persistence ??= {};
  config.persistence.config ??= {};
  config.persistence.config.excludedKeys ??= ['loading'];

  return signalStoreFeature(
    withState({
      errorMessage: '',
      loading: false,
    }),
    withEntities({ entity: type<TEntity>() }),
    withPersistence(config.persistence.name, config.persistence.config),
    withComputed(
      (
        { entityMap, errorMessage, loading },
        activatedRoute = inject(ActivatedRoute)
      ) => {
        const id = toSignal(
          activatedRoute.paramMap.pipe(
            map((paramMap) => paramMap.get(config.entityIdRouteParam) ?? '')
          )
        ) as Signal<string>;
        const entity = computed(() => entityMap()[id()] ?? {});

        return {
          id,
          entity,
          vm: computed(() => ({
            entity,
            errorMessage,
            loading,
          })),
        };
      }
    ),
    withMethods(({ id, ...store }, dataService = inject(dataServiceType)) => ({
      get: () => {
        patchState(store, { loading: true });

        return dataService.get(id()).pipe(
          tapResponse({
            next: (data) => {
              patchState(store, setEntity(data as TEntity));
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
    })),
    withHooks({
      onInit: ({ get, id }) => {
        if (config.getOnInit) {
          // Retrieve detail based on id
          rxMethod((x$) =>
            x$.pipe(
              takeUntilDestroyed(),
              switchMap(() => get())
            )
          )(id);
        }
      },
    })
  );
}
