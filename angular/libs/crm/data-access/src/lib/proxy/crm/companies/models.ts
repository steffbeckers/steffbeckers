import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CompanyCreateInputDto {
  name: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
}

export interface CompanyDto extends EntityDto<string> {
  name?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
}

export interface CompanyListDto extends EntityDto<string> {
  name?: string;
}

export interface CompanyListInputDto extends PagedAndSortedResultRequestDto {
  query?: string;
}
