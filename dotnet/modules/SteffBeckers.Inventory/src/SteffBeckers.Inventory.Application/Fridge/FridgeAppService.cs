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

    public async Task AddItemAsync(string item)
    {
        await using IDocumentSession session = _store.LightweightSession();

        // TODO
        //session.Events.StartStream(Guid.Parse("8e7272fb-99a3-4e23-9d5b-12aa575cd389"), );

        await session.SaveChangesAsync();
    }

    public async Task TakeItemAsync(string item)
    {
    }
}