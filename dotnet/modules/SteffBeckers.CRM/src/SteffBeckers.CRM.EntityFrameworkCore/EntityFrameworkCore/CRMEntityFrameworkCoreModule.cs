using Microsoft.Extensions.DependencyInjection;
using SteffBeckers.CRM.Companies;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace SteffBeckers.CRM.EntityFrameworkCore;

[DependsOn(
	typeof(CRMDomainModule),
	typeof(AbpEntityFrameworkCoreModule)
)]
public class CRMEntityFrameworkCoreModule : AbpModule
{
	public override void ConfigureServices(ServiceConfigurationContext context)
	{
		context.Services.AddAbpDbContext<CRMDbContext>(options =>
		{
			options.AddRepository<Company, EfCoreCompanyRepository>();
		});
	}
}
