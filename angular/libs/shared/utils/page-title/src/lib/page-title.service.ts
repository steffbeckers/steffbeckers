import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PAGE_TITLE_CONFIG } from './page-title.config';

@Injectable({ providedIn: 'root' })
export class PageTitleService {
  private title = inject(Title);
  private config = inject(PAGE_TITLE_CONFIG);

  setTitle(newTitle: string): void {
    this.title.setTitle(`${this.config?.prefix ?? ''}${newTitle}`);
  }
}
