using System;

namespace SteffBeckers.Inventory.Fridges;

public class FridgeCreated
{
    public Guid FridgeId { get; set; }
    
    public string Name { get; set; } = null!;
}