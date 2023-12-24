import { Component } from '@angular/core';
import { LocalizationModule } from '@abp/ng.core';

@Component({
  imports: [LocalizationModule],
  selector: 'sb-dashboard',
  standalone: true,
  styleUrl: './dashboard.component.scss',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
