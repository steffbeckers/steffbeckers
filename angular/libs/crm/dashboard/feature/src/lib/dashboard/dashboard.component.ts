import { Component } from '@angular/core';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';

@Component({
  imports: [AbpLocalizationModule],
  selector: 'sb-dashboard',
  standalone: true,
  styleUrl: './dashboard.component.scss',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
