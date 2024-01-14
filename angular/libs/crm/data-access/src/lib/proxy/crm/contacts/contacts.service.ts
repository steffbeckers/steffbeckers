import type { ContactDto, ContactListDto, ContactListInputDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  apiName = 'CRM';
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/crm/contacts/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ContactDto>({
      method: 'GET',
      url: `/api/crm/contacts/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: ContactListInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ContactListDto>>({
      method: 'GET',
      url: '/api/crm/contacts',
      params: { query: input.query, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
