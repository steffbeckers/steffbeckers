using System;

namespace SteffBeckers.Inventory.Fridge;

public class ItemTaken
{
    public Guid FridgeId { get; set; }

    public string Name { get; set; } = null!;
    
    public decimal Quantity { get; set; }
}