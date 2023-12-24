import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { CompanyDetailStore } from '@steffbeckers/crm/companies/data-access';

@Component({
  imports: [AbpLocalizationModule, CommonModule, FormsModule, RouterLink],
  providers: [CompanyDetailStore],
  selector: 'sb-company-detail',
  standalone: true,
  styleUrl: './company-detail.component.scss',
  templateUrl: './company-detail.component.html',
})
export class CompanyDetailComponent {
  store = inject(CompanyDetailStore);
  vm = this.store.vm();
}
