import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCompanyStore } from '@steffbeckers/crm/companies/data-access';
import { ButtonComponent } from '@steffbeckers/shared/ui/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AbpLocalizationModule,
    ButtonComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [UpdateCompanyStore],
  selector: 'sb-update-company',
  standalone: true,
  styleUrl: './update-company.component.scss',
  templateUrl: './update-company.component.html',
})
export class UpdateCompanyComponent {
  store = inject(UpdateCompanyStore);
  vm = this.store.vm();
  form = this.store.form;
  Validators = Validators;
}
