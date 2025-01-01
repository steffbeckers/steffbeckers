import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { CompanyDetailStore } from '@steffbeckers/crm/companies/company-detail/data-access';
import { ButtonComponent } from '@steffbeckers/shared/ui/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AbpLocalizationModule,
    ButtonComponent,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  providers: [CompanyDetailStore],
  selector: 'sb-company-detail',
  styleUrl: './company-detail.component.scss',
  templateUrl: './company-detail.component.html',
})
export class CompanyDetailComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(CompanyDetailStore);
  vm = this.store.vm();

  constructor() {
    // Redirect to companies
    effect(() => {
      if (!this.store.loading() && !this.store.entity().id) {
        this.router.navigate(['..'], {
          relativeTo: this.activatedRoute,
        });
      }
    });
  }

  @HostListener('document:keyup.delete')
  onDeleteKeyUp(): void {
    this.store.delete();
  }
}
