import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { ContactsStore } from '@steffbeckers/crm/contacts/data-access';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AbpLocalizationModule, CommonModule, FormsModule, RouterLink],
    providers: [ContactsStore],
    selector: 'sb-contacts',
    styleUrl: './contacts.component.scss',
    templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  store = inject(ContactsStore);
  vm = this.store.vm();
}
