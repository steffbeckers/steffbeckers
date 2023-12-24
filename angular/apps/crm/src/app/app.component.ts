import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@steffbeckers/crm/ui';

@Component({
  imports: [NavbarComponent, RouterOutlet],
  selector: 'sb-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {}
