using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace SteffBeckers.CRM.Contacts;

public class Contact : FullAuditedAggregateRoot<Guid>, IMultiTenant
{
	private string? email;
	private string? phoneNumber;
	private string firstName;
	private string lastName;

	public Contact(
		Guid id,
		string firstName,
		string lastName)
	{
		Id = id;
		FirstName = firstName;
		LastName = lastName;
	}

	private Contact()
	{
	}

	public string FirstName
	{
		get => firstName;
		set
		{
			Check.NotNullOrEmpty(firstName, nameof(FirstName), ContactConsts.FirstNameMaxLength);
			firstName = value;
		}
	}

	public string LastName
	{
		get => lastName;
		set
		{
			Check.NotNullOrEmpty(lastName, nameof(LastName), ContactConsts.LastNameMaxLength);
			lastName = value;
		}
	}

	public string? Email
	{
		get => email;
		set
		{
			Check.Length(value, nameof(Email), ContactConsts.EmailMaxLength);
			email = value;
		}
	}

	public string? PhoneNumber
	{
		get => phoneNumber;
		set
		{
			Check.Length(value, nameof(PhoneNumber), ContactConsts.PhoneNumberMaxLength);
			phoneNumber = value;
		}
	}

	public Guid? TenantId { get; set; }
}
