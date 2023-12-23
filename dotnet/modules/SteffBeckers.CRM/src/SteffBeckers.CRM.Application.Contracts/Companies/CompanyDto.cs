using System;
using Volo.Abp.Application.Dtos;

namespace SteffBeckers.CRM.Companies;

public class CompanyDto : EntityDto<Guid>
{
	public string Name { get; set; }

	public string? PhoneNumber { get; set; }

	public string? Email { get; set; }

	public string? Website { get; set; }
}