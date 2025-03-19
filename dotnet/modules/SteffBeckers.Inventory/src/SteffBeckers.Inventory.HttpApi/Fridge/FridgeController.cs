using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp;

namespace SteffBeckers.Inventory.Fridge;

[RemoteService(Name = InventoryRemoteServiceConsts.RemoteServiceName)]
[Area(InventoryRemoteServiceConsts.ModuleName)]
[ControllerName("Inventory - Fridge")]
[Route("api/inventory/fridge")]
public class FridgeController : InventoryController, IFridgeAppService
{
    private readonly IFridgeAppService _fridgeAppService;

    public FridgeController(IFridgeAppService fridgeAppService)
    {
        _fridgeAppService = fridgeAppService;
    }

    [HttpPost]
    public Task AddItemAsync(string item)
    {
        return _fridgeAppService.AddItemAsync(item);
    }

    [HttpDelete]
    public Task TakeItemAsync(string item)
    {
        return _fridgeAppService.TakeItemAsync(item);
    }
}