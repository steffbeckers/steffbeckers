using System;
using System.Collections.Generic;
using System.Linq;

namespace SteffBeckers.Inventory.Fridges;

public class Fridge
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public IList<Item> Items { get; set; } = new List<Item>();

    public static Fridge Apply(FridgeCreated eventData) => new()
    {
        Id = eventData.FridgeId,
        Name = eventData.Name
    };

    public static Fridge Apply(ItemAdded eventData, Fridge fridge)
    {
        var item = fridge.Items.FirstOrDefault(x => x.Name == eventData.Name);

        if (item == null)
        {
            item = new Item()
            {
                Name = eventData.Name,
                Quantity = eventData.Quantity
            };
            
            fridge.Items.Add(item);
        }
        else
        {
            item.Quantity += eventData.Quantity;
        }
        
        return fridge;
    }

    public static Fridge Apply(ItemTaken eventData, Fridge fridge)
    {
        foreach (var item in fridge.Items.Where(x => x.Name == eventData.Name))
        {
            item.Quantity -= eventData.Quantity;
        }

        fridge.Items.RemoveAll(x => x.Quantity == 0);

        return fridge;
    }
}