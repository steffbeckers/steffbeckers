import { Environment as AbpEnvironment } from '@abp/ng.core';

const origin = 'https://crm.steffbeckers.localhost';

export const environment = {
  production: false,
  application: {
    baseUrl: origin,
    name: 'CRM',
  },
  oAuthConfig: {
    // TODO: Changing issuer to https://steffbeckers.localhost/ triggers login redirect loop
    issuer: 'https://crm.steffbeckers.localhost/',
    redirectUri: origin,
    clientId: 'SteffBeckers_CRM',
    responseType: 'code',
    scope: 'offline_access openid profile email phone roles SteffBeckers',
    requireHttps: true,
    timeoutFactor: 0.5,
  },
  apis: {
    default: {
      url: '',
      rootNamespace: 'SteffBeckers',
    },
  },
} as AbpEnvironment;
