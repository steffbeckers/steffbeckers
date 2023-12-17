import type { CompanyListDto, CompanyListInputDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  apiName = 'CRM';
  

  getList = (input: CompanyListInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CompanyListDto>>({
      method: 'GET',
      url: '/api/crm/companies',
      params: { query: input.query, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
