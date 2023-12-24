import { NgModule } from '@angular/core';
import { CoreTestingModule as AbpCoreTestingModule } from '@abp/ng.core/testing';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  imports: [AbpCoreTestingModule.withConfig(), RouterTestingModule],
  exports: [AbpCoreTestingModule, RouterTestingModule],
})
export class TestingModule {}
