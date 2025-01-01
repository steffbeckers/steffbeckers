import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { ContactDetailStore } from '@steffbeckers/crm/contacts/data-access';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AbpLocalizationModule, CommonModule, FormsModule],
  providers: [ContactDetailStore],
  selector: 'sb-contact-detail',
  styleUrl: './contact-detail.component.scss',
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent {
  store = inject(ContactDetailStore);
  vm = this.store.vm();
}
