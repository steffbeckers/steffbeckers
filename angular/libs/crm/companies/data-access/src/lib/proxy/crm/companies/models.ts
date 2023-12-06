import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CompanyListDto extends EntityDto<string> {
  name?: string;
}

export interface CompanyListInputDto extends PagedAndSortedResultRequestDto {
  query?: string;
}
