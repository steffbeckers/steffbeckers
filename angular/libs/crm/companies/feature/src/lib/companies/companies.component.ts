import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesStore } from '@steffbeckers/crm/companies/data-access';
import { LocalizationModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sb-companies',
  standalone: true,
  imports: [CommonModule, FormsModule, LocalizationModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
  providers: [CompaniesStore],
})
export class CompaniesComponent {
  store = inject(CompaniesStore);
  vm = this.store.vm();
}
