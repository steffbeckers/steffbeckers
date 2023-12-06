using Microsoft.EntityFrameworkCore;
using SteffBeckers.CRM.Companies;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace SteffBeckers.CRM.EntityFrameworkCore;

[ConnectionStringName(CRMDbProperties.ConnectionStringName)]
public interface ICRMDbContext : IEfCoreDbContext
{
	DbSet<Company> Companies { get; }
}
