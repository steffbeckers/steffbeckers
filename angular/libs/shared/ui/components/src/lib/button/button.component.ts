import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'default' | 'primary' | 'dashed' | 'link' | 'text';
export type ButtonSize = 'default' | 'small' | 'large';

@Component({
  imports: [CommonModule, NzButtonModule],
  selector: 'sb-button',
  standalone: true,
  styleUrl: './button.component.scss',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  danger = input<boolean>();
  disabled = input<boolean>();
  loading = input<boolean>();
  variant = input<ButtonVariant>('default');
  type = input<ButtonType>('button');
  size = input<ButtonSize>('default');
}
