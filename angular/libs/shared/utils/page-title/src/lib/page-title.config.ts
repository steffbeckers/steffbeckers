import { InjectionToken, Provider } from '@angular/core';

export interface PageTitleConfig {
  prefix?: string;
}

export const PAGE_TITLE_CONFIG = new InjectionToken<PageTitleConfig>(
  'PageTitleConfig'
);

export const providePageTitleConfig = (config?: PageTitleConfig): Provider => ({
  provide: PAGE_TITLE_CONFIG,
  useValue: config,
});
