using Volo.Abp.Modularity;

namespace SteffBeckers.Inventory;

[DependsOn(
    typeof(InventoryApplicationModule),
    typeof(InventoryDomainTestModule)
    )]
public class InventoryApplicationTestModule : AbpModule
{

}
