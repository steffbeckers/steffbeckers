using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace SteffBeckers.Inventory.Fridge;

public interface IFridgeAppService : IApplicationService
{
    Task<Guid> CreateAsync(string name);
    
    Task<FridgeDto?> GetAsync(Guid id);
    
    Task AddItemAsync(Guid id, string name, decimal quantity);

    Task TakeItemAsync(Guid id, string name, decimal quantity);
}