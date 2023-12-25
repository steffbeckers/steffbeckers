import { Component, OnInit, inject } from '@angular/core';
import {
  LocalizationModule as AbpLocalizationModule,
  LocalizationService as AbpLocalizationService,
} from '@abp/ng.core';
import { PageTitleService } from '@steffbeckers/shared/utils/page-title';

@Component({
  imports: [AbpLocalizationModule],
  selector: 'sb-contacts',
  standalone: true,
  styleUrl: './contacts.component.scss',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  private abpLocalizationService = inject(AbpLocalizationService);
  private pageTitleService = inject(PageTitleService);

  ngOnInit(): void {
    // TODO: Move to ContactsStore
    this.pageTitleService.setTitle(
      this.abpLocalizationService.instant('CRM::Contacts')
    );
  }
}
