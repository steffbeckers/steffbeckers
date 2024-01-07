import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CreateCompanyForm,
  CreateCompanyStore,
} from '@steffbeckers/crm/companies/data-access';

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
  vm = this.store.vm();
  form = new FormGroup<CreateCompanyForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    website: new FormControl(''),
  });

  constructor() {
    this.store.connectForm(this.form);
  }
}
