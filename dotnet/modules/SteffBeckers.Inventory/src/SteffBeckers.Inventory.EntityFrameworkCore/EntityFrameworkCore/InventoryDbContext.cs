﻿using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace SteffBeckers.Inventory.EntityFrameworkCore;

[ConnectionStringName(InventoryDbProperties.ConnectionStringName)]
public class InventoryDbContext : AbpDbContext<InventoryDbContext>, IInventoryDbContext
{
    /* Add DbSet for each Aggregate Root here. Example:
     * public DbSet<Question> Questions { get; set; }
     */

    public InventoryDbContext(DbContextOptions<InventoryDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ConfigureInventory();
    }
}
