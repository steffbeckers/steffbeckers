import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesStore } from '@steffbeckers/crm/companies/data-access';
import { ButtonComponent } from '@steffbeckers/shared/ui/components';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AbpLocalizationModule,
        ButtonComponent,
        CommonModule,
        FormsModule,
        RouterLink,
    ],
    providers: [CompaniesStore],
    selector: 'sb-companies',
    styleUrl: './companies.component.scss',
    templateUrl: './companies.component.html'
})
export class CompaniesComponent {
  store = inject(CompaniesStore);
  vm = this.store.vm();
}
