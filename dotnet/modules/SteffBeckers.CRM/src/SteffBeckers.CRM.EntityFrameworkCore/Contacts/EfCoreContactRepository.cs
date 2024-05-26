using SteffBeckers.CRM.EntityFrameworkCore;
using System;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace SteffBeckers.CRM.Contacts;

public class EfCoreContactRepository : EfCoreRepository<CRMDbContext, Contact, Guid>, IContactRepository
{
	public EfCoreContactRepository(IDbContextProvider<CRMDbContext> dbContextProvider)
		: base(dbContextProvider)
	{
	}
}
