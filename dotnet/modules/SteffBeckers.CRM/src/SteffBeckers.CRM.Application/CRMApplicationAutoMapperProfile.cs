using AutoMapper;
using SteffBeckers.CRM.Companies;

namespace SteffBeckers.CRM;

public class CRMApplicationAutoMapperProfile : Profile
{
	public CRMApplicationAutoMapperProfile()
	{
		CreateMap<Company, CompanyListDto>();
	}
}
