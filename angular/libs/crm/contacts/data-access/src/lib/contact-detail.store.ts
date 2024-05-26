import { signalStore } from '@ngrx/signals';
import { ContactsService } from '@steffbeckers/crm/data-access';
import {
  withEntityDetail,
  withPageTitle,
} from '@steffbeckers/shared/data-access';
import { DetailedContact } from './contact.model';

export const ContactDetailStore = signalStore(
  withEntityDetail<DetailedContact, ContactsService>(ContactsService, {
    persistence: {
      name: 'sb-contact-detail',
    },
  }),
  withPageTitle(({ entity }) => ({
    localizationKey: 'CRM::ContactDetailPageTitle',
    params: [`${entity().firstName} ${entity().lastName}`],
  }))
);
