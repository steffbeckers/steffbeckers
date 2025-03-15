﻿using Volo.Abp.Modularity;

namespace MyCompany.MyProject;

/* Inherit from this class for your domain layer tests. */
public abstract class MyProjectDomainTestBase<TStartupModule> : MyProjectTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
