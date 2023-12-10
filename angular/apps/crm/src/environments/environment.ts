import { Environment } from '@abp/ng.core';

const origin = 'https://crm.steffbeckers.local';

export const environment = {
  production: false,
  application: {
    baseUrl: origin,
    name: 'CRM',
  },
  oAuthConfig: {
    issuer: 'https://steffbeckers.local/',
    redirectUri: origin,
    clientId: 'SteffBeckers_App',
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
} as Environment;
