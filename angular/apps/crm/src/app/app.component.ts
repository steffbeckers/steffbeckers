import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'sb-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {}
