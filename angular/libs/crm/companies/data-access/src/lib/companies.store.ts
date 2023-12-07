import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { CompaniesService } from './proxy/crm/companies';
import { firstValueFrom } from 'rxjs';

export interface Company {
  name: string;
}

export interface State {
  companies: Company[];
  query: string;
}

export const CompaniesStore = signalStore(
  withState<State>({
    companies: [],
    query: '',
  }),
  withComputed(({ companies, query }) => ({
    vm: computed(() => ({
      companies,
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

        patchState(state, { companies: (data.items ?? []) as Company[] });
      },
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    },
  })
);
