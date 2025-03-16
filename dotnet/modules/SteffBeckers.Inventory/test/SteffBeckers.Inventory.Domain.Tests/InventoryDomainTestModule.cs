using Volo.Abp.Modularity;

namespace SteffBeckers.Inventory;

[DependsOn(
    typeof(InventoryDomainModule),
    typeof(InventoryTestBaseModule)
)]
public class InventoryDomainTestModule : AbpModule
{

}
