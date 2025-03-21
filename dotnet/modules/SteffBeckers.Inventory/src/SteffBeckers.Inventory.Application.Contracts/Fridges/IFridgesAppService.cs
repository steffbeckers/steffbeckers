using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace SteffBeckers.Inventory.Fridges;

public interface IFridgesAppService : IApplicationService
{
    Task<Guid> CreateAsync(string name);
    
    Task<FridgeDto?> GetAsync(Guid id, DateTimeOffset? dateTime = null);
    
    Task<IList<FridgeDto>> GetListAsync();
    
    Task AddItemAsync(Guid id, string name, decimal quantity);

    Task TakeItemAsync(Guid id, string name, decimal quantity);
}