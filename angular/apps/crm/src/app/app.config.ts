import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { differentLocales, provideAbpCore, withOptions } from '@abp/ng.core';
import { environment } from '../environments/environment';
import {
  RegisterLocaleData,
  defaultLocalErrorHandlerFn,
} from '@abp/ng.core/locale';
import { provideAbpOAuth } from '@abp/ng.oauth';
import { appRoutes } from './app.routes';
import { providePageTitleConfig } from '@steffbeckers/shared/utils/page-title';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

let localeMap = {} as { [key: string]: string };

export function registerLocale(
  {
    cultureNameLocaleFileMap = {},
    errorHandlerFn = defaultLocalErrorHandlerFn,
  } = {} as RegisterLocaleData
) {
  return (locale: string): Promise<unknown> => {
    localeMap = { ...differentLocales, ...cultureNameLocaleFileMap };
    locale = localeMap[locale] ?? locale;

    return new Promise((resolve, reject) => {
      let importPromise = import('@angular/common/locales/en');

      switch (locale) {
        case 'nl':
          importPromise = import('@angular/common/locales/nl');
          break;
      }

      return (
        importPromise
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((val: any) => {
            let module = val;

            while (module.default) {
              module = module.default;
            }

            resolve({ default: module });
          })
          .catch((error) => {
            errorHandlerFn({
              resolve,
              reject,
              error,
              locale,
            });
          })
      );
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAbpCore(
      withOptions({
        environment,
        registerLocaleFn: registerLocale(),
      })
    ),
    provideAbpOAuth(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideRouter(appRoutes),
    providePageTitleConfig({
      prefix: 'CRM - ',
    }),
  ],
};
