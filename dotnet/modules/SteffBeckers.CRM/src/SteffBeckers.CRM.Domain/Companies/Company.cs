using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace SteffBeckers.CRM.Companies;

public class Company : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
	private string name;
	private string? email;
	private string? phoneNumber;
	private string? website;

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
			Check.NotNullOrEmpty(value, nameof(Name), CompanyConsts.NameMaxLength);
			name = value;
		}
	}

	public string? Email
	{
		get => email;
		set
		{
			Check.Length(value, nameof(Email), CompanyConsts.EmailMaxLength);
			email = value;
		}
	}

	public string? PhoneNumber
	{
		get => phoneNumber;
		set
		{
			Check.Length(value, nameof(PhoneNumber), CompanyConsts.PhoneNumberMaxLength);
			phoneNumber = value;
		}
	}

	public string? Website
	{
		get => website;
		set
		{
			Check.Length(value, nameof(Website), CompanyConsts.WebsiteMaxLength);
			website = value;
		}
	}

	public Guid? TenantId { get; set; }
}
