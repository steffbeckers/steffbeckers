using Volo.Abp.Modularity;

namespace SteffBeckers;

public abstract class SteffBeckersApplicationTestBase<TStartupModule> : SteffBeckersTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
