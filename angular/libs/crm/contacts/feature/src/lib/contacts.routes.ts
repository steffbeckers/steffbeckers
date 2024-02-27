import { Routes } from '@angular/router';

export const contactsRoutes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./contact-detail/contact-detail.component').then(
        (m) => m.ContactDetailComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./contacts/contacts.component').then((m) => m.ContactsComponent),
  },
];
