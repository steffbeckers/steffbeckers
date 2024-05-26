﻿using Microsoft.AspNetCore.Authorization;
using SteffBeckers.CRM.Permissions;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.ChangeTracking;
using Volo.Abp.Domain.Entities;
using Volo.Abp.ObjectMapping;

namespace SteffBeckers.CRM.Companies;

[Authorize(CRMPermissions.Companies.Default)]
public class CompaniesAppService : CRMAppService, ICompaniesAppService
{
	private readonly ICompanyRepository _companyRepository;

	public CompaniesAppService(ICompanyRepository companyRepository)
	{
		_companyRepository = companyRepository;
	}

	[Authorize(CRMPermissions.Companies.Create)]
	public async Task<CompanyDto> CreateAsync(CompanyCreateInputDto input)
	{
		Company company = new Company(
			id: GuidGenerator.Create(),
			name: input.Name)
		{
			Email = input.Email,
			PhoneNumber = input.PhoneNumber,
			Website = input.Website,
		};

		await _companyRepository.InsertAsync(company);

		await CurrentUnitOfWork!.SaveChangesAsync();

		return await GetAsync(company.Id);
	}

	[Authorize(CRMPermissions.Companies.Delete)]
	public async Task DeleteAsync(Guid id)
	{
		await _companyRepository.DeleteAsync(id);
	}

	[DisableEntityChangeTracking]
	public async Task<CompanyDto> GetAsync(Guid id)
	{
		IQueryable<Company> companyQueryable = await _companyRepository.GetQueryableAsync();
		companyQueryable = companyQueryable.Where(x => x.Id == id);

		CompanyDto? companyDto = await AsyncExecuter.FirstOrDefaultAsync(ObjectMapper.GetMapper().ProjectTo<CompanyDto>(companyQueryable));

		if (companyDto == null)
		{
			throw new EntityNotFoundException(L[CRMErrorCodes.Companies.NotFound]);
		}

		return companyDto;
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

	[Authorize(CRMPermissions.Companies.Update)]
	public async Task<CompanyDto> UpdateAsync(Guid id, CompanyUpdateInputDto input)
	{
		Company company = await _companyRepository.GetAsync(id);

		company.Name = input.Name;
		company.Email = input.Email;
		company.PhoneNumber = input.PhoneNumber;
		company.Website = input.Website;

		await _companyRepository.UpdateAsync(company);

		await CurrentUnitOfWork!.SaveChangesAsync();

		return await GetAsync(id);
	}
}
