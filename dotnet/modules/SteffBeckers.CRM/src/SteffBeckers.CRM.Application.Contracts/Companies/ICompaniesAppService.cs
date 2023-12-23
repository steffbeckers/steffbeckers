using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SteffBeckers.CRM.Companies;

public interface ICompaniesAppService : IApplicationService
{
	Task<PagedResultDto<CompanyListDto>> GetListAsync(CompanyListInputDto input);

	Task<CompanyDto> GetAsync(Guid id);
}
