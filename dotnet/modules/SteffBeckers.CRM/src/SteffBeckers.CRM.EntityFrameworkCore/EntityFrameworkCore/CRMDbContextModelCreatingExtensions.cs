﻿using Microsoft.EntityFrameworkCore;
using SteffBeckers.CRM.Companies;
using SteffBeckers.CRM.Contacts;
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
			b.Property(x => x.Email).HasMaxLength(CompanyConsts.EmailMaxLength);
			b.Property(x => x.PhoneNumber).HasMaxLength(CompanyConsts.PhoneNumberMaxLength);
			b.Property(x => x.Website).HasMaxLength(CompanyConsts.WebsiteMaxLength);
		});

		builder.Entity<Contact>(b =>
		{
			b.ToTable(CRMDbProperties.DbTablePrefix + "Contacts", CRMDbProperties.DbSchema);
			b.ConfigureByConvention();
			b.Property(x => x.FirstName).IsRequired().HasMaxLength(ContactConsts.FirstNameMaxLength);
			b.Property(x => x.LastName).IsRequired().HasMaxLength(ContactConsts.LastNameMaxLength);
			b.Property(x => x.Email).HasMaxLength(ContactConsts.EmailMaxLength);
			b.Property(x => x.PhoneNumber).HasMaxLength(ContactConsts.PhoneNumberMaxLength);
		});
	}
}
