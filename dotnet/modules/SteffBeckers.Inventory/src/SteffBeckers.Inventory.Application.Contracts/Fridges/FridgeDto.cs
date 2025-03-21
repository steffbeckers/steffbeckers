using System;
using System.Collections.Generic;

namespace SteffBeckers.Inventory.Fridges;

public class FridgeDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public IList<ItemDto> Items { get; set; } = new List<ItemDto>();
}