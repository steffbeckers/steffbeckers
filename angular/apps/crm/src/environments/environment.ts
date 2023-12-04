import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'CRM',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44336/',
    redirectUri: baseUrl,
    clientId: 'SteffBeckers_App',
    responseType: 'code',
    scope: 'offline_access openid profile email phone roles SteffBeckers',
    requireHttps: true,
    timeoutFactor: 0.5,
  },
  apis: {
    default: {
      url: 'https://localhost:44336',
      rootNamespace: 'SteffBeckers',
    },
  },
} as Environment;
