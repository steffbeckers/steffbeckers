import type { SampleDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SampleService {
  apiName = 'CRM';

  get = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, SampleDto>(
      {
        method: 'GET',
        url: '/api/CRM/sample',
      },
      { apiName: this.apiName, ...config }
    );

  getAuthorized = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, SampleDto>(
      {
        method: 'GET',
        url: '/api/CRM/sample/authorized',
      },
      { apiName: this.apiName, ...config }
    );

  constructor(private restService: RestService) {}
}
