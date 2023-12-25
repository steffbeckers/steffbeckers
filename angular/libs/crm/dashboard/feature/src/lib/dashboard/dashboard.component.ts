import { Component, OnInit, inject } from '@angular/core';
import {
  LocalizationModule as AbpLocalizationModule,
  LocalizationService as AbpLocalizationService,
} from '@abp/ng.core';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [AbpLocalizationModule],
  selector: 'sb-dashboard',
  standalone: true,
  styleUrl: './dashboard.component.scss',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private title = inject(Title);
  private abpLocalizationService = inject(AbpLocalizationService);

  ngOnInit(): void {
    // TODO: Move to DashboardStore
    this.title.setTitle(
      // TODO: "CRM - " in global => own title service?
      `CRM - ${this.abpLocalizationService.instant('::Dashboard')}`
    );
  }
}
