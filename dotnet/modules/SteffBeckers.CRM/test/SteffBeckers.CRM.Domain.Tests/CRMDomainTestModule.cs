using Volo.Abp.Modularity;

namespace SteffBeckers.CRM;

[DependsOn(
    typeof(CRMDomainModule),
    typeof(CRMTestBaseModule)
)]
public class CRMDomainTestModule : AbpModule
{

}
