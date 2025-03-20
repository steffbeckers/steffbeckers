using System;
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
    public Task<Guid> CreateAsync(string name)
    {
        return _fridgeAppService.CreateAsync(name);
    }

    [HttpGet]
    [Route("{id}")]
    public Task<FridgeDto?> GetAsync(Guid id)
    {
        return _fridgeAppService.GetAsync(id);
    }

    [HttpPost]
    [Route("{id}/items")]
    public Task AddItemAsync(Guid id, string name, decimal quantity)
    {
        return _fridgeAppService.AddItemAsync(id, name, quantity);
    }

    [HttpDelete]
    [Route("{id}/items")]
    public Task TakeItemAsync(Guid id, string name, decimal quantity)
    {
        return _fridgeAppService.TakeItemAsync(id, name, quantity);
    }
}