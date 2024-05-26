using System;
using Volo.Abp.Domain.Repositories;

namespace SteffBeckers.CRM.Contacts;

public interface IContactRepository : IRepository<Contact, Guid>
{
}
