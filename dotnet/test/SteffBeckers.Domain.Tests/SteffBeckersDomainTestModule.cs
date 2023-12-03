using Volo.Abp.Modularity;

namespace SteffBeckers;

[DependsOn(
    typeof(SteffBeckersDomainModule),
    typeof(SteffBeckersTestBaseModule)
)]
public class SteffBeckersDomainTestModule : AbpModule
{

}
