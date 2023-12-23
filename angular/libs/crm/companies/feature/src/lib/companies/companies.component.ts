import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesStore } from '@steffbeckers/crm/companies/data-access';
import { LocalizationModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, LocalizationModule, RouterLink],
  providers: [CompaniesStore],
  selector: 'sb-companies',
  standalone: true,
  styleUrl: './companies.component.scss',
  templateUrl: './companies.component.html',
})
export class CompaniesComponent {
  store = inject(CompaniesStore);
  vm = this.store.vm();
}
