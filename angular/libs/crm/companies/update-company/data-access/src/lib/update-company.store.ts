import { effect, inject, resource } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  patchState,
  signalStore,
  signalStoreFeature,
  withMethods,
  withProps,
  withState,
  withHooks,
} from '@ngrx/signals';
import { CompaniesService } from '@steffbeckers/crm/data-access';
import { firstValueFrom } from 'rxjs';

const withForm = <TForm extends Record<string, any>, TData = TForm>(
  createForm: (fb: FormBuilder) => FormGroup
) =>
  signalStoreFeature(
    withProps((_, fb = inject(FormBuilder)) => ({
      form: createForm(fb),
    })),
    withMethods(({ form }) => ({
      cancel(): void {
        form.reset();
      },
      async submit(save: (data: TData) => Promise<void>): Promise<void> {
        if (form.invalid) return;
        await save(form.value as TData);
      },
    }))
  );

// Example usage for UpdateCompanyStore
interface CompanyForm {
  name: string;
  phoneNumber: string;
  email: string;
  website: string;
}

interface CompanyData {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  website: string;
}

export const UpdateCompanyStore = signalStore(
  withForm<CompanyForm, CompanyData>(
    (fb: FormBuilder) => fb.group({
      name: ['', Validators.required],
      phoneNumber: '',
      email: '',
      website: '',
    })
  ),
  withState({ id: '' }),
  withMethods((store) => ({
    setId(id: string): void {
      patchState(store, { id });
    },
  })),
  withProps(({ id }, companiesService = inject(CompaniesService)) => ({
    company: resource({
      request: () => ({ id: id() }),
      loader: ({ request }) => firstValueFrom(companiesService.get(request.id)),
    }),
  })),
  withHooks(({ company, form }) => ({
    onInit() {
      effect(() => {
        const companyData = company.value();
        if (!companyData) return;

        form.patchValue({
          name: companyData.name,
          phoneNumber: companyData.phoneNumber,
          email: companyData.email,
          website: companyData.website,
        });
      });
    },
  })),
  withMethods(({ submit, id }, companiesService = inject(CompaniesService)) => ({
    async save(): Promise<void> {
      await submit(async (data) => {
        await firstValueFrom(
          companiesService.update(id(), data)
        );
      });
    },
  }))
);
