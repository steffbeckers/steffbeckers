using System;
using System.Collections.Generic;

namespace SteffBeckers.Inventory.Fridge;

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
        // TODO: Filter existing items and increment the quantity
        fridge.Items.Add(new Item()
        {
            Name = eventData.Name,
            Quantity = eventData.Quantity
        });
        
        return fridge;
    }
}