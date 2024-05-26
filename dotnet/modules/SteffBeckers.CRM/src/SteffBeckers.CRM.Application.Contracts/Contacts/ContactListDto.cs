using System;
using Volo.Abp.Application.Dtos;

namespace SteffBeckers.CRM.Contacts;

public class ContactListDto : EntityDto<Guid>
{
	public string FirstName { get; set; }

	public string LastName { get; set; }
}