using Volo.Abp.Domain;
using Volo.Abp.Modularity;

namespace SteffBeckers.CRM;

[DependsOn(
    typeof(AbpDddDomainModule),
    typeof(CRMDomainSharedModule)
)]
public class CRMDomainModule : AbpModule
{

}
