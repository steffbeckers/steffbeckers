import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { ContactDetailStore } from '@steffbeckers/crm/contacts/data-access';

@Component({
  imports: [AbpLocalizationModule, CommonModule, FormsModule, RouterLink],
  providers: [ContactDetailStore],
  selector: 'sb-contact-detail',
  standalone: true,
  styleUrl: './contact-detail.component.scss',
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent {
  store = inject(ContactDetailStore);
  vm = this.store.vm();
}
