using Volo.Abp.Autofac;
using Volo.Abp.Http.Client.IdentityModel;
using Volo.Abp.Modularity;

namespace SteffBeckers.CRM;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(CRMHttpApiClientModule),
    typeof(AbpHttpClientIdentityModelModule)
    )]
public class CRMConsoleApiClientModule : AbpModule
{

}
