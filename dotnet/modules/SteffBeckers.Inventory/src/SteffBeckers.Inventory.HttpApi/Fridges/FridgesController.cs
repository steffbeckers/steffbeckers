using System;
using System.Collections.Generic;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp;

namespace SteffBeckers.Inventory.Fridges;

[RemoteService(Name = InventoryRemoteServiceConsts.RemoteServiceName)]
[Area(InventoryRemoteServiceConsts.ModuleName)]
[ControllerName("Inventory - Fridges")]
[Route("api/inventory/fridges")]
public class FridgesController : InventoryController, IFridgesAppService
{
    private readonly IFridgesAppService _fridgesAppService;

    public FridgesController(IFridgesAppService fridgesAppService)
    {
        _fridgesAppService = fridgesAppService;
    }

    [HttpPost]
    public Task<Guid> CreateAsync(string name)
    {
        return _fridgesAppService.CreateAsync(name);
    }

    [HttpGet]
    [Route("{id}")]
    public Task<FridgeDto?> GetAsync(Guid id, DateTimeOffset? dateTime = null)
    {
        return _fridgesAppService.GetAsync(id, dateTime);
    }

    [HttpGet]
    public Task<IList<FridgeDto>> GetListAsync()
    {
        return _fridgesAppService.GetListAsync();
    }

    [HttpPost]
    [Route("{id}/items")]
    public Task AddItemAsync(Guid id, string name, decimal quantity)
    {
        return _fridgesAppService.AddItemAsync(id, name, quantity);
    }

    [HttpDelete]
    [Route("{id}/items")]
    public Task TakeItemAsync(Guid id, string name, decimal quantity)
    {
        return _fridgesAppService.TakeItemAsync(id, name, quantity);
    }
}