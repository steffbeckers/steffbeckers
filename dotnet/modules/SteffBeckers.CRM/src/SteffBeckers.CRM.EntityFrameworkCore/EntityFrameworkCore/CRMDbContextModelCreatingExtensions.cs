using Microsoft.EntityFrameworkCore;
using SteffBeckers.CRM.Companies;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace SteffBeckers.CRM.EntityFrameworkCore;

public static class CRMDbContextModelCreatingExtensions
{
	public static void ConfigureCRM(
		this ModelBuilder builder)
	{
		Check.NotNull(builder, nameof(builder));

		builder.Entity<Company>(b =>
		{
			b.ToTable(CRMDbProperties.DbTablePrefix + "Companies", CRMDbProperties.DbSchema);
			b.ConfigureByConvention();
			b.Property(x => x.Name).IsRequired().HasMaxLength(CompanyConsts.NameMaxLength);
		});
	}
}
