import { Environment } from '@abp/ng.core';

export const environment = {
  production: true,
  remoteEnv: {
    url: '/dynamic-env.json',
    method: 'GET',
  },
} as Environment;
