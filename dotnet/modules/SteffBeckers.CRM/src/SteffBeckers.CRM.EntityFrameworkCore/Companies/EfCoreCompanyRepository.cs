using SteffBeckers.CRM.EntityFrameworkCore;
using System;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace SteffBeckers.CRM.Companies;

public class EfCoreCompanyRepository : EfCoreRepository<CRMDbContext, Company, Guid>, ICompanyRepository
{
	public EfCoreCompanyRepository(IDbContextProvider<CRMDbContext> dbContextProvider)
		: base(dbContextProvider)
	{
	}
}
