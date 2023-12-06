using System;
using Volo.Abp.Application.Dtos;

namespace SteffBeckers.CRM.Companies;

public class CompanyListDto : EntityDto<Guid>
{
	public string Name { get; set; }
}