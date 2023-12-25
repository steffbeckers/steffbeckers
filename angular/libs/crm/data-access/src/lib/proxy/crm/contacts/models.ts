import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ContactDto extends EntityDto<string> {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

export interface ContactListDto extends EntityDto<string> {
  firstName?: string;
  lastName?: string;
}

export interface ContactListInputDto extends PagedAndSortedResultRequestDto {
  query?: string;
}
