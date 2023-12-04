using Volo.Abp.Modularity;

namespace SteffBeckers.CRM;

/* Inherit from this class for your application layer tests.
 * See SampleAppService_Tests for example.
 */
public abstract class CRMApplicationTestBase<TStartupModule> : CRMTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
