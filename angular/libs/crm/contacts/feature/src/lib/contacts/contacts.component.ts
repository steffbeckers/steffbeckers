import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from '@abp/ng.core';

@Component({
  imports: [CommonModule, LocalizationModule],
  selector: 'sb-contacts',
  standalone: true,
  styleUrl: './contacts.component.scss',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {}
