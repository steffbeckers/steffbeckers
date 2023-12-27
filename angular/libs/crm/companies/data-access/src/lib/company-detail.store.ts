import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setEntity, withEntities } from '@ngrx/signals/entities';
import { Signal, computed, effect, inject } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withPersistence } from '@steffbeckers/shared/data-access';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DetailedCompany } from './company.model';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocalizationService as AbpLocalizationService } from '@abp/ng.core';
import { PageTitleService } from '@steffbeckers/shared/utils/page-title';

export const CompanyDetailStore = signalStore(
  withState({
    errorMessage: '',
    loading: false,
  }),
  withEntities({ entity: type<DetailedCompany>() }),
  withPersistence('company-detail', {
    excludedKeys: ['loading'],
    keyPrefix: 'sb-',
  }),
  withComputed((_, activatedRoute = inject(ActivatedRoute)) => ({
    id: toSignal(
      activatedRoute.paramMap.pipe(map((paramMap) => paramMap.get('companyId')))
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
  })),
  withMethods(
    ({ id, ...store }, companiesService = inject(CompaniesService)) => ({
      get: () => {
        patchState(store, { loading: true });

        return companiesService.get(id()).pipe(
          tapResponse({
            next: (data) => {
              patchState(store, setEntity(data as DetailedCompany));
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
    onInit({ get, id }) {
      // Retrieve detail based on id
      rxMethod((x$) => x$.pipe(switchMap(() => get())))(id);
    },
  }),
  // TODO: This is entity specific
  withHooks({
    onInit(
      { entity },
      abpLocalizationService = inject(AbpLocalizationService),
      pageTitleService = inject(PageTitleService)
    ) {
      // Update page title
      effect(() => {
        const { name } = entity();
        if (name) {
          pageTitleService.setTitle(
            `${abpLocalizationService.instant('CRM::Company')} ${name}`
          );
        }
      });
    },
  })
);
