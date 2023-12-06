using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.ChangeTracking;
using Volo.Abp.ObjectMapping;

namespace SteffBeckers.CRM.Companies;

[Authorize]
public class CompaniesAppService : CRMAppService, ICompaniesAppService
{
	private readonly ICompanyRepository _companyRepository;

	public CompaniesAppService(ICompanyRepository companyRepository)
	{
		_companyRepository = companyRepository;
	}

	[DisableEntityChangeTracking]
	public async Task<PagedResultDto<CompanyListDto>> GetListAsync(CompanyListInputDto input)
	{
		IQueryable<Company> companyQueryable = await _companyRepository.GetQueryableAsync();

		companyQueryable = companyQueryable.WhereIf(
			!string.IsNullOrWhiteSpace(input.Query),
			x => x.Name.Contains(input.Query!));

		long totalCount = await AsyncExecuter.LongCountAsync(companyQueryable);

		if (string.IsNullOrEmpty(input.Sorting))
		{
			companyQueryable = companyQueryable.OrderBy(x => x.Name);
		}
		else
		{
			companyQueryable = companyQueryable.OrderBy(input.Sorting);
		}

		companyQueryable = companyQueryable.PageBy(input.SkipCount, input.MaxResultCount);

		return new PagedResultDto<CompanyListDto>()
		{
			TotalCount = totalCount,
			Items = await AsyncExecuter.ToListAsync(ObjectMapper.GetMapper().ProjectTo<CompanyListDto>(companyQueryable))
		};
	}
}
