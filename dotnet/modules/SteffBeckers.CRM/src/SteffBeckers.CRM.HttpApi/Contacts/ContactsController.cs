using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace SteffBeckers.CRM.Contacts;

[RemoteService(Name = CRMRemoteServiceConsts.RemoteServiceName)]
[Area(CRMRemoteServiceConsts.ModuleName)]
[ControllerName("CRM - Contacts")]
[Route("api/crm/contacts")]
public class ContactsController : CRMController, IContactsAppService
{
	private readonly IContactsAppService _contactsAppService;

	public ContactsController(IContactsAppService contactsAppService)
	{
		_contactsAppService = contactsAppService;
	}

	[HttpDelete]
	[Route("{id}")]
	public Task DeleteAsync(Guid id)
	{
		return _contactsAppService.DeleteAsync(id);
	}

	[HttpGet]
	[Route("{id}")]
	public Task<ContactDto> GetAsync(Guid id)
	{
		return _contactsAppService.GetAsync(id);
	}

	[HttpGet]
	public Task<PagedResultDto<ContactListDto>> GetListAsync(ContactListInputDto input)
	{
		return _contactsAppService.GetListAsync(input);
	}
}
