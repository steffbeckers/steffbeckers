import { Component, OnInit, inject } from '@angular/core';
import {
  LocalizationModule as AbpLocalizationModule,
  LocalizationService as AbpLocalizationService,
} from '@abp/ng.core';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [AbpLocalizationModule],
  selector: 'sb-contacts',
  standalone: true,
  styleUrl: './contacts.component.scss',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  private title = inject(Title);
  private abpLocalizationService = inject(AbpLocalizationService);

  ngOnInit(): void {
    // TODO: Move to ContactsStore
    this.title.setTitle(
      // TODO: "CRM - " in global => own title service?
      `CRM - ${this.abpLocalizationService.instant('CRM::Contacts')}`
    );
  }
}
