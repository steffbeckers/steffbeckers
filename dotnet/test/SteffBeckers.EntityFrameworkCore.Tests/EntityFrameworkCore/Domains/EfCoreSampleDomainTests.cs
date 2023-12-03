using SteffBeckers.Samples;
using Xunit;

namespace SteffBeckers.EntityFrameworkCore.Domains;

[Collection(SteffBeckersTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<SteffBeckersEntityFrameworkCoreTestModule>
{

}
