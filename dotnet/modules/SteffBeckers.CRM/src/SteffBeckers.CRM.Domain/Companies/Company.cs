using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace SteffBeckers.CRM.Companies;

public class Company : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
	private string name;

	public Company(
		Guid id,
		string name)
	{
		Id = id;
		Name = name;
	}

	private Company()
	{
	}

	public string Name
	{
		get => name;
		set
		{
			Check.NotNullOrEmpty(name, nameof(Name), CompanyConsts.NameMaxLength);
			name = value;
		}
	}

	public Guid? TenantId { get; set; }
}
