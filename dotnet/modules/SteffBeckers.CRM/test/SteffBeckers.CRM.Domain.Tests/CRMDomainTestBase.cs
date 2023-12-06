using Volo.Abp.Modularity;

namespace SteffBeckers.CRM;

public abstract class CRMDomainTestBase<TStartupModule> : CRMTestBase<TStartupModule>
	where TStartupModule : IAbpModule
{
}
