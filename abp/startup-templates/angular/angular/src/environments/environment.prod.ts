import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44309/',
  redirectUri: baseUrl,
  clientId: 'MyProject_App',
  responseType: 'code',
  scope: 'offline_access MyProject',
  requireHttps: true,
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'MyProject',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44309',
      rootNamespace: 'MyCompany.MyProject',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
