using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SteffBeckers.CRM.Contacts;

public interface IContactsAppService : IApplicationService
{
	Task<PagedResultDto<ContactListDto>> GetListAsync(ContactListInputDto input);

	Task<ContactDto> GetAsync(Guid id);
}
