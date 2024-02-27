import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalizationModule as AbpLocalizationModule } from '@abp/ng.core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AbpLocalizationModule, RouterLink],
  selector: 'sb-navbar',
  standalone: true,
  styleUrl: './navbar.component.scss',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
