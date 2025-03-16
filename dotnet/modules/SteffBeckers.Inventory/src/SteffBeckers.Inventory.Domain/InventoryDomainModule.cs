using Volo.Abp.Domain;
using Volo.Abp.Modularity;

namespace SteffBeckers.Inventory;

[DependsOn(
    typeof(AbpDddDomainModule),
    typeof(InventoryDomainSharedModule)
)]
public class InventoryDomainModule : AbpModule
{

}
