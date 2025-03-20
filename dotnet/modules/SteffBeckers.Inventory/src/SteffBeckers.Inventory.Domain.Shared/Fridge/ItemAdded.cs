using System;

namespace SteffBeckers.Inventory.Fridge;

public class ItemAdded
{
    public Guid FridgeId { get; set; }

    public string Name { get; set; } = null!;
    
    public decimal Quantity { get; set; }
}