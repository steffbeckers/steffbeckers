import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesStore } from '@steffbeckers/crm/companies/data-access';

@Component({
  selector: 'sb-company-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  providers: [CompaniesStore],
})
export class CompanyListComponent {
  store = inject(CompaniesStore);
}
