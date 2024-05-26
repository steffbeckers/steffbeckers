import { NgModule } from '@angular/core';
import { CoreTestingModule as AbpCoreTestingModule } from '@abp/ng.core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { providePageTitleConfig } from '@steffbeckers/shared/utils/page-title';

@NgModule({
  imports: [AbpCoreTestingModule.withConfig(), RouterTestingModule],
  exports: [AbpCoreTestingModule, RouterTestingModule],
  providers: [providePageTitleConfig()],
})
export class TestingModule {}
