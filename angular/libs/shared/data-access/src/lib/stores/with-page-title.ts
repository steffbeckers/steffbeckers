import { LocalizationService as AbpLocalizationService } from '@abp/ng.core';
import { effect, inject } from '@angular/core';
import { withHooks } from '@ngrx/signals';
import {
  EmptyFeatureResult,
  SignalStoreFeature,
  SignalStoreFeatureResult,
  SignalStoreSlices,
} from '@ngrx/signals/src/signal-store-models';
import { Prettify } from '@ngrx/signals/src/ts-helpers';
import { PageTitleService } from '@steffbeckers/shared/utils/page-title';

export function withPageTitle<Input extends SignalStoreFeatureResult>(
  pageTitleFactory: (
    store: Prettify<SignalStoreSlices<Input['state']> & Input['signals']>
  ) => {
    localizationKey: string;
    params?: string[];
  }
): SignalStoreFeature<Input, EmptyFeatureResult> {
  return (store) =>
    withHooks({
      onInit(
        _,
        abpLocalizationService = inject(AbpLocalizationService),
        pageTitleService = inject(PageTitleService)
      ) {
        effect(() => {
          const { localizationKey, params } = pageTitleFactory({
            ...store.slices,
            ...store.signals,
          });

          if (localizationKey) {
            pageTitleService.setTitle(
              abpLocalizationService.instant(localizationKey, ...(params ?? []))
            );
          }
        });
      },
    })(store);
}
