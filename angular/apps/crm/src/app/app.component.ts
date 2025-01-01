import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@steffbeckers/crm/ui';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavbarComponent, RouterLink, RouterOutlet],
    selector: 'sb-root',
    styleUrl: './app.component.scss',
    templateUrl: './app.component.html'
})
export class AppComponent {}
