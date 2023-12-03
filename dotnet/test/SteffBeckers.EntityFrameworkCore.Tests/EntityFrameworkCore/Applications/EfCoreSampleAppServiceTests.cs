using SteffBeckers.Samples;
using Xunit;

namespace SteffBeckers.EntityFrameworkCore.Applications;

[Collection(SteffBeckersTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<SteffBeckersEntityFrameworkCoreTestModule>
{

}
