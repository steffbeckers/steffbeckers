using Volo.Abp.Modularity;

namespace SteffBeckers;

/* Inherit from this class for your domain layer tests. */
public abstract class SteffBeckersDomainTestBase<TStartupModule> : SteffBeckersTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
