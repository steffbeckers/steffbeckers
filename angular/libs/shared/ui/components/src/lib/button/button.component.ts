import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Colors } from '@steffbeckers/shared/utils/colors';

@Component({
  imports: [CommonModule],
  selector: 'sb-button',
  standalone: true,
  styleUrl: './button.component.scss',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  color = input<Colors>('primary');
  disabled = input<boolean>();
}
