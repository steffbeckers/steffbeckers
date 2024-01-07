import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCompanyStore } from '@steffbeckers/crm/companies/data-access';

@Component({
  imports: [AbpLocalizationModule, CommonModule, ReactiveFormsModule],
  providers: [CreateCompanyStore],
  selector: 'sb-create-company',
  standalone: true,
  styleUrl: './create-company.component.scss',
  templateUrl: './create-company.component.html',
})
export class CreateCompanyComponent {
  store = inject(CreateCompanyStore);
}
