using Volo.Abp.Modularity;

namespace SteffBeckers.CRM;

[DependsOn(
    typeof(CRMApplicationModule),
    typeof(CRMDomainTestModule)
    )]
public class CRMApplicationTestModule : AbpModule
{

}
