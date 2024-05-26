using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace SteffBeckers.CRM.Companies;

[RemoteService(Name = CRMRemoteServiceConsts.RemoteServiceName)]
[Area(CRMRemoteServiceConsts.ModuleName)]
[ControllerName("CRM - Companies")]
[Route("api/crm/companies")]
public class CompaniesController : CRMController, ICompaniesAppService
{
	private readonly ICompaniesAppService _companiesAppService;

	public CompaniesController(ICompaniesAppService companiesAppService)
	{
		_companiesAppService = companiesAppService;
	}

	[HttpPost]
	public Task<CompanyDto> CreateAsync(CompanyCreateInputDto input)
	{
		return _companiesAppService.CreateAsync(input);
	}

	[HttpDelete]
	[Route("{id}")]
	public Task DeleteAsync(Guid id)
	{
		return _companiesAppService.DeleteAsync(id);
	}

	[HttpGet]
	[Route("{id}")]
	public Task<CompanyDto> GetAsync(Guid id)
	{
		return _companiesAppService.GetAsync(id);
	}

	[HttpGet]
	public Task<PagedResultDto<CompanyListDto>> GetListAsync(CompanyListInputDto input)
	{
		return _companiesAppService.GetListAsync(input);
	}

	[HttpPut]
	[Route("{id}")]
	public Task<CompanyDto> UpdateAsync(Guid id, CompanyUpdateInputDto input)
	{
		return _companiesAppService.UpdateAsync(id, input);
	}
}
