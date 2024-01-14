using Microsoft.AspNetCore.Authorization;
using SteffBeckers.CRM.Permissions;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.ChangeTracking;
using Volo.Abp.Domain.Entities;
using Volo.Abp.ObjectMapping;

namespace SteffBeckers.CRM.Contacts;

[Authorize(CRMPermissions.Contacts.Default)]
public class ContactsAppService : CRMAppService, IContactsAppService
{
	private readonly IContactRepository _contactRepository;

	public ContactsAppService(IContactRepository contactRepository)
	{
		_contactRepository = contactRepository;
	}

	[Authorize(CRMPermissions.Contacts.Delete)]
	public async Task DeleteAsync(Guid id)
	{
		await _contactRepository.DeleteAsync(id);
	}

	[DisableEntityChangeTracking]
	public async Task<ContactDto> GetAsync(Guid id)
	{
		IQueryable<Contact> contactQueryable = await _contactRepository.GetQueryableAsync();
		contactQueryable = contactQueryable.Where(x => x.Id == id);

		ContactDto? contactDto = await AsyncExecuter.FirstOrDefaultAsync(ObjectMapper.GetMapper().ProjectTo<ContactDto>(contactQueryable));

		if (contactDto == null)
		{
			throw new EntityNotFoundException(L[CRMErrorCodes.Contacts.NotFound]);
		}

		return contactDto;
	}

	[DisableEntityChangeTracking]
	public async Task<PagedResultDto<ContactListDto>> GetListAsync(ContactListInputDto input)
	{
		IQueryable<Contact> contactQueryable = await _contactRepository.GetQueryableAsync();

		contactQueryable = contactQueryable.WhereIf(
			!string.IsNullOrWhiteSpace(input.Query),
			x => x.FirstName.Contains(input.Query!) ||
				x.LastName.Contains(input.Query!));

		long totalCount = await AsyncExecuter.LongCountAsync(contactQueryable);

		if (string.IsNullOrEmpty(input.Sorting))
		{
			contactQueryable = contactQueryable.OrderBy(x => x.FirstName);
		}
		else
		{
			contactQueryable = contactQueryable.OrderBy(input.Sorting);
		}

		contactQueryable = contactQueryable.PageBy(input.SkipCount, input.MaxResultCount);

		return new PagedResultDto<ContactListDto>()
		{
			TotalCount = totalCount,
			Items = await AsyncExecuter.ToListAsync(ObjectMapper.GetMapper().ProjectTo<ContactListDto>(contactQueryable))
		};
	}
}
