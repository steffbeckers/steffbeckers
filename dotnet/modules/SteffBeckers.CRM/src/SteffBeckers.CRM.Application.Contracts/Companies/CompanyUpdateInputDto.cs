using System.ComponentModel.DataAnnotations;

namespace SteffBeckers.CRM.Companies;

public class CompanyUpdateInputDto
{
	[Required]
	public string Name { get; set; }

	public string? PhoneNumber { get; set; }

	public string? Email { get; set; }

	public string? Website { get; set; }
}

// TODO: Add abstract validator from FluentValidation here
