import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CoreModule as AbpCoreModule } from '@abp/ng.core';
import { environment } from '../environments/environment';
import { registerLocale } from '@abp/ng.core/locale';
import { AbpOAuthModule } from '@abp/ng.oauth';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AbpCoreModule.forRoot({
        environment,
        registerLocaleFn: registerLocale(),
      }),
      AbpOAuthModule.forRoot()
    ),
    provideRouter(appRoutes),
  ],
};
