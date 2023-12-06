using System;
using Volo.Abp.Domain.Repositories;

namespace SteffBeckers.CRM.Companies;

public interface ICompanyRepository : IRepository<Company, Guid>
{
}
