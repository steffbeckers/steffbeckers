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
    companies: this.store.entities,
    errorMessage: this.store.errorMessage,
    loading: this.store.loading,
    query: this.store.query,
    sorting: this.store.sorting,
  }))();

  queryChanged(query: string): void {
    patchState(this.store, { query });
  }

  sortingChanged(sorting: string): void {
    patchState(this.store, { sorting });
  }
}
