using System;
using System.Collections.Generic;
using System.Linq;
using Marten;
using System.Threading.Tasks;

namespace SteffBeckers.Inventory.Fridges;

public class FridgesAppService : InventoryAppService, IFridgesAppService
{
    private readonly IDocumentStore _store;

    public FridgesAppService(IDocumentStore store)
    {
        _store = store;
    }

    public async Task<FridgeDto?> GetAsync(Guid id, DateTimeOffset? dateTime = null)
    {
        await using IDocumentSession session = _store.LightweightSession();
        
        var fridge = await session.Events.AggregateStreamAsync<Fridge>(id, timestamp: dateTime);
        
        if (fridge == null)
        {
            return null;
        }
        
        // TODO: Can we include the timestamp of the last event?

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

    public async Task<IList<FridgeDto>> GetListAsync()
    {
        await using IDocumentSession session = _store.LightweightSession();
        
        // TODO: We need a projection for this?
        var fridgeList= await session.Query<Fridge>().ToListAsync();

        return fridgeList
            .Select(x => new FridgeDto()
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToList();
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