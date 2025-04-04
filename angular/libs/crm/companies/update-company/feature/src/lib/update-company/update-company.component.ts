import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { UpdateCompanyStore } from '@steffbeckers/crm/companies/update-company/data-access';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AbpLocalizationModule,
    CommonModule,
    ReactiveFormsModule],
  providers: [UpdateCompanyStore],
  selector: 'sb-update-company',
  styleUrl: './update-company.component.scss',
  templateUrl: './update-company.component.html',
})
export class UpdateCompanyComponent implements OnInit {
  #store = inject(UpdateCompanyStore);
  
  company = this.#store.company.value;
  form = this.#store.form;
  id = input.required<string>();
  save = this.#store.save;

  ngOnInit(): void {
    this.#store.setId(this.id());
  }
}
