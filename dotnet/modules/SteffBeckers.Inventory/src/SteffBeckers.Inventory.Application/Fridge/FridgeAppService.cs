using System;
using System.Linq;
using Marten;
using System.Threading.Tasks;

namespace SteffBeckers.Inventory.Fridge;

public class FridgeAppService : InventoryAppService, IFridgeAppService
{
    private readonly IDocumentStore _store;

    public FridgeAppService(IDocumentStore store)
    {
        _store = store;
    }

    public async Task<FridgeDto?> GetAsync(Guid id)
    {
        await using IDocumentSession session = _store.LightweightSession();
        
        var fridge = await session.Events.AggregateStreamAsync<Fridge>(id);

        if (fridge == null)
        {
            return null;
        }

        return new FridgeDto()
        {
            Id = fridge.Id,
            Name = fridge.Name,
            Items = fridge.Items.Select(x => new ItemDto()
            {
                Name = x.Name,
                Quantity = x.Quantity
            }).ToList()
        };
    }

    public async Task AddItemAsync(Guid id, string name, decimal quantity)
    {
        await using IDocumentSession session = _store.LightweightSession();
        session.Events.Append(id, new ItemAdded()
        {
            FridgeId = id,
            Name = name,
            Quantity = quantity
        });
        await session.SaveChangesAsync();
    }
    
    public async Task<Guid> CreateAsync(string name)
    {
        Guid id = Guid.NewGuid();
        
        await using IDocumentSession session = _store.LightweightSession();
        session.Events.StartStream(id, new FridgeCreated()
        {
            FridgeId = id,
            Name = name
        });
        await session.SaveChangesAsync();

        return id;
    }

    public async Task TakeItemAsync(Guid id, string name, decimal quantity)
    {
        await using IDocumentSession session = _store.LightweightSession();
        session.Events.Append(id, new ItemTaken()
        {
            FridgeId = id,
            Name = name,
            Quantity = quantity
        });
        await session.SaveChangesAsync();
    }
}