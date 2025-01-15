import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateCompanyStore } from '@steffbeckers/crm/companies/update-company/data-access';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UpdateCompanyStore],
  selector: 'sb-update-company',
  styleUrl: './update-company.component.scss',
  templateUrl: './update-company.component.html',
})
export class UpdateCompanyComponent implements OnInit {
  store = inject(UpdateCompanyStore);
  id = input.required<string>();

  ngOnInit(): void {
    this.store.setId(this.id());
  }
}
