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
import { firstValueFrom } from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access/proxy/crm/companies';

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
  withMethods((state) => {
    const { query } = state;
    const companiesService = inject(CompaniesService);

    return {
      load: async () => {
        const data = await firstValueFrom(
          companiesService.getList({
            maxResultCount: 10,
            query: query(),
          })
        );

        patchState(state, setAllEntities((data.items ?? []) as Company[]));
      },
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    },
  })
);
