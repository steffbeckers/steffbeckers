using System;
using System.Collections.Generic;

namespace SteffBeckers.Inventory.Fridge;

public class FridgeDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public IList<ItemDto> Items { get; set; } = new List<ItemDto>();
}