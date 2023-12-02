import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { State } from './companies.state';
import { Company } from './companies.models';

export const CompaniesStore = signalStore(
  withState<State>({
    companies: [],
  }),
  withMethods((state) => ({
    load: () => {
      // TODO: Retrieve companies from API
      patchState(state, {
        companies: [
          {
            name: 'Fuzed',
          },
          {
            name: 'Zoli',
          },
        ] as Company[],
      });
    },
  })),
  withHooks({
    onInit({ load }) {
      load();
    },
  })
);
