using AutoMapper;
using SteffBeckers.CRM.Companies;
using SteffBeckers.CRM.Contacts;

namespace SteffBeckers.CRM;

public class CRMApplicationAutoMapperProfile : Profile
{
	public CRMApplicationAutoMapperProfile()
	{
		CreateMap<Company, CompanyDto>();
		CreateMap<Company, CompanyListDto>();

		CreateMap<Contact, ContactDto>();
		CreateMap<Contact, ContactListDto>();
	}
}
