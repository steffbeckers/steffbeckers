import { LocalizationService as AbpLocalizationService } from '@abp/ng.core';
import { inject } from '@angular/core';
import { withHooks, signalStoreFeature } from '@ngrx/signals';
import { PageTitleService } from '@steffbeckers/shared/utils/page-title';

export const withPageTitle = (
  // TODO: Include store as input of factory
  pageTitleFactory: () => { localizationKey: string; params: string[] }
) => {
  return signalStoreFeature(
    withHooks({
      onInit(
        _,
        abpLocalizationService = inject(AbpLocalizationService),
        pageTitleService = inject(PageTitleService)
      ) {
        const { localizationKey } = pageTitleFactory();
        let { params } = pageTitleFactory();
        params ??= [];

        if (localizationKey) {
          pageTitleService.setTitle(
            abpLocalizationService.instant(localizationKey, ...params)
          );
        }
      },
    })
  );
};
