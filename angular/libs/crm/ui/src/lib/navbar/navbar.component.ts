import { Component } from '@angular/core';
import { LocalizationModule } from '@abp/ng.core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [LocalizationModule, RouterLink],
  selector: 'sb-navbar',
  standalone: true,
  styleUrl: './navbar.component.scss',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
