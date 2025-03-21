using System;

namespace SteffBeckers.Inventory.Fridges;

public class ItemAdded
{
    public Guid FridgeId { get; set; }

    public string Name { get; set; } = null!;
    
    public decimal Quantity { get; set; }
}