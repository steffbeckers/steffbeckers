using Volo.Abp.Application.Dtos;

namespace SteffBeckers.CRM.Contacts;

public class ContactListInputDto : PagedAndSortedResultRequestDto
{
	// TODO: Move to base class
	public string? Query { get; set; }
}