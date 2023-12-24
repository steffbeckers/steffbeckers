import { Component } from '@angular/core';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';

@Component({
  imports: [AbpLocalizationModule],
  selector: 'sb-contacts',
  standalone: true,
  styleUrl: './contacts.component.scss',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {}
