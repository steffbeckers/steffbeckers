import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesStore } from '@steffbeckers/crm/companies/data-access';
import { LocalizationModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'sb-company-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LocalizationModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  providers: [CompaniesStore],
})
export class CompanyListComponent {
  private store = inject(CompaniesStore);

  vm = computed(() => ({
    entities: this.store.entities,
    query: this.store.query,
  }))();

  queryChanged(query: string): void {
    patchState(this.store, { query });
  }
}
