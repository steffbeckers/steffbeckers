using Volo.Abp.Modularity;

namespace SteffBeckers.CRM;

public abstract class CRMApplicationTestBase<TStartupModule> : CRMTestBase<TStartupModule>
	where TStartupModule : IAbpModule
{
}
