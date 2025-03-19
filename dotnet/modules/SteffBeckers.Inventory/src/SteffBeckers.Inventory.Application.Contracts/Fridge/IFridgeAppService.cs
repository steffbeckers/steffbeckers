using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace SteffBeckers.Inventory.Fridge;

public interface IFridgeAppService : IApplicationService
{
    Task AddItemAsync(string item);

    Task TakeItemAsync(string item);
}