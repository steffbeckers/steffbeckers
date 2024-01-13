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
  UpdateCompanyStore,
} from '@steffbeckers/crm/companies/data-access';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [AbpLocalizationModule, CommonModule, ReactiveFormsModule],
  providers: [UpdateCompanyStore],
  selector: 'sb-update-company',
  standalone: true,
  styleUrl: './update-company.component.scss',
  templateUrl: './update-company.component.html',
})
export class UpdateCompanyComponent {
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
  store = inject(UpdateCompanyStore);
  Validators = Validators;
  vm = this.store.vm();

  constructor() {
    this.store.connectForm(this.form);

    // Redirect to company detail
    effect(() => {
      const companyDto = this.store.formResponse();
      if (companyDto?.id) {
        this.router.navigate(['..'], {
          relativeTo: this.activatedRoute,
        });
      }
    });
  }
}
