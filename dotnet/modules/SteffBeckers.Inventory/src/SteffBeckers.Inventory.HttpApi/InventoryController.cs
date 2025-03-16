using SteffBeckers.Inventory.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace SteffBeckers.Inventory;

public abstract class InventoryController : AbpControllerBase
{
    protected InventoryController()
    {
        LocalizationResource = typeof(InventoryResource);
    }
}
