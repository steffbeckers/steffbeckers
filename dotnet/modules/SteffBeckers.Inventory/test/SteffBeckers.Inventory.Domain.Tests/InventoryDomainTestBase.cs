﻿using Volo.Abp.Modularity;

namespace SteffBeckers.Inventory;

/* Inherit from this class for your domain layer tests.
 * See SampleManager_Tests for example.
 */
public abstract class InventoryDomainTestBase<TStartupModule> : InventoryTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
