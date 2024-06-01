import {
  APP_INITIALIZER,
  ApplicationConfig,
  Injector,
  ModuleWithProviders,
  NgModule,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  ABP,
  CoreModule as AbpCoreModule,
  COOKIE_LANGUAGE_KEY,
  SessionStateService,
  differentLocales,
} from '@abp/ng.core';
import { environment } from '../environments/environment';
import {
  RegisterLocaleData,
  defaultLocalErrorHandlerFn,
} from '@abp/ng.core/locale';
import { AbpOAuthModule } from '@abp/ng.oauth';
import { appRoutes } from './app.routes';
import { providePageTitleConfig } from '@steffbeckers/shared/utils/page-title';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

export function setLanguageToCookie(injector: Injector) {
  return () => {
    const sessionState = injector.get(SessionStateService);
    const document = injector.get(DOCUMENT);
    const cookieLanguageKey = injector.get(COOKIE_LANGUAGE_KEY);

    sessionState.getLanguage$().subscribe((language) => {
      if (!language) {
        language = navigator.languages
          ? navigator.languages[0]
          : navigator.language;
      }

      const cookieValue = encodeURIComponent(`c=${language}|uic=${language}`);
      document.cookie = `${cookieLanguageKey}=${cookieValue};path=/`;
    });
  };
}

export const CookieLanguageProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: setLanguageToCookie,
  deps: [Injector],
  multi: true,
};

@NgModule()
export class AbpModule {
  static forRoot(options: ABP.Root): ModuleWithProviders<AbpModule> {
    const abpCoreModule = AbpCoreModule.forRoot(options);
    const abpOAuthModule = AbpOAuthModule.forRoot();

    abpCoreModule.providers?.push(abpOAuthModule.providers as Provider[]);

    // Replace the CookieLanguageProvider from ABP
    if (abpCoreModule.providers) {
      abpCoreModule.providers[1] = CookieLanguageProvider;
    }

    return abpCoreModule;
  }
}

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
    importProvidersFrom(
      AbpModule.forRoot({
        environment,
        registerLocaleFn: registerLocale(),
      })
    ),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideRouter(appRoutes),
    providePageTitleConfig({
      prefix: 'CRM - ',
    }),
  ],
};
