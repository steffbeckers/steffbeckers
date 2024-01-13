import { Component, effect, inject } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [AbpLocalizationModule, CommonModule, ReactiveFormsModule],
  providers: [CreateCompanyStore],
  selector: 'sb-create-company',
  standalone: true,
  styleUrl: './create-company.component.scss',
  templateUrl: './create-company.component.html',
})
export class CreateCompanyComponent {
  form = new FormGroup<CreateCompanyForm>({
    email: new FormControl(''),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl(''),
    website: new FormControl(''),
  });
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  store = inject(CreateCompanyStore);
  Validators = Validators;
  vm = this.store.vm();

  constructor() {
    this.store.connectForm(this.form);

    // Redirect to company detail
    effect(() => {
      const companyDto = this.store.formResponse();
      if (companyDto?.id) {
        this.router.navigate(['..', companyDto.id], {
          relativeTo: this.activatedRoute,
        });
      }
    });
  }
}
