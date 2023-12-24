import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesStore } from '@steffbeckers/crm/companies/data-access';
import {
  LocalizationModule as AbpLocalizationModule,
  LocalizationService as AbpLocalizationService,
} from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [AbpLocalizationModule, CommonModule, FormsModule, RouterLink],
  providers: [CompaniesStore],
  selector: 'sb-companies',
  standalone: true,
  styleUrl: './companies.component.scss',
  templateUrl: './companies.component.html',
})
export class CompaniesComponent implements OnInit {
  private title = inject(Title);
  private abpLocalizationService = inject(AbpLocalizationService);

  store = inject(CompaniesStore);
  vm = this.store.vm();

  ngOnInit(): void {
    this.title.setTitle(
      // TODO: "CRM - " in global => own title service?
      `CRM - ${this.abpLocalizationService.instant('CRM::Companies')}`
    );
  }
}
