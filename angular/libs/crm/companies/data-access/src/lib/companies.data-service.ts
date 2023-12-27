import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import {
  EntitiesDataService,
  EntityListDto,
  EntityListInputDto,
} from '@steffbeckers/shared/data-access';

@Injectable({
  providedIn: 'root',
})
export class CompaniesDataService implements EntitiesDataService {
  companiesService = inject(CompaniesService);

  getList(input: EntityListInputDto): Observable<EntityListDto> {
    return this.companiesService.getList(input);
  }
}
