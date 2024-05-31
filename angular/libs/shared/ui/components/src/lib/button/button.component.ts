import { Component, input } from '@angular/core';

export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'sb-button',
  standalone: true,
  styleUrl: './button.component.scss',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  disabled = input<boolean>();
  type = input<ButtonType>('button');
}
