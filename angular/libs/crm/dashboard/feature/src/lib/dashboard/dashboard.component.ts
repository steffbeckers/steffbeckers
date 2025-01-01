import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  LocalizationModule as AbpLocalizationModule,
  LocalizationService as AbpLocalizationService,
} from '@abp/ng.core';
import { PageTitleService } from '@steffbeckers/shared/utils/page-title';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AbpLocalizationModule],
  selector: 'sb-dashboard',
  styleUrl: './dashboard.component.scss',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private abpLocalizationService = inject(AbpLocalizationService);
  private pageTitleService = inject(PageTitleService);

  ngOnInit(): void {
    // TODO: Move to DashboardStore
    this.pageTitleService.setTitle(
      this.abpLocalizationService.instant('::Dashboard')
    );
  }
}
