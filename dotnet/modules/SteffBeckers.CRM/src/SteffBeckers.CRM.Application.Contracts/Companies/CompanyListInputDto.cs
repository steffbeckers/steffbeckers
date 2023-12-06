using Volo.Abp.Application.Dtos;

namespace SteffBeckers.CRM.Companies;

public class CompanyListInputDto : PagedAndSortedResultRequestDto
{
	// TODO: Move to base class
	public string? Query { get; set; }
}