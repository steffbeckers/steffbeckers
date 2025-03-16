using SteffBeckers.Inventory.Localization;
using Volo.Abp.Application.Services;

namespace SteffBeckers.Inventory;

public abstract class InventoryAppService : ApplicationService
{
    protected InventoryAppService()
    {
        LocalizationResource = typeof(InventoryResource);
        ObjectMapperContext = typeof(InventoryApplicationModule);
    }
}
