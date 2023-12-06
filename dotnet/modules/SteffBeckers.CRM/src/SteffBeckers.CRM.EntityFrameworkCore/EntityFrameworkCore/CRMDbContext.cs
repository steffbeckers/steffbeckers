using Microsoft.EntityFrameworkCore;
using SteffBeckers.CRM.Companies;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace SteffBeckers.CRM.EntityFrameworkCore;

[ConnectionStringName(CRMDbProperties.ConnectionStringName)]
public class CRMDbContext : AbpDbContext<CRMDbContext>, ICRMDbContext
{
	public DbSet<Company> Companies { get; set; }


	public CRMDbContext(DbContextOptions<CRMDbContext> options)
		: base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);

		builder.ConfigureCRM();
	}
}
