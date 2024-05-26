using System;
using Volo.Abp.Application.Dtos;

namespace SteffBeckers.CRM.Contacts;

public class ContactDto : EntityDto<Guid>
{
	public string FirstName { get; set; }

	public string LastName { get; set; }

	public string? PhoneNumber { get; set; }

	public string? Email { get; set; }
}