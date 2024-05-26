import { signalStore } from '@ngrx/signals';
import { ContactsService } from '@steffbeckers/crm/data-access';
import {
  withEntitiesList,
  withPageTitle,
} from '@steffbeckers/shared/data-access';
import { Contact } from './contact.model';

export const ContactsStore = signalStore(
  withEntitiesList<Contact, ContactsService>(ContactsService, {
    initialState: {
      sorting: 'FirstName ASC',
    },
    persistence: {
      name: 'sb-contacts',
    },
  }),
  withPageTitle(() => ({
    localizationKey: 'CRM::Contacts',
  }))
);
