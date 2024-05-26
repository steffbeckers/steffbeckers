using SteffBeckers.CRM.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace SteffBeckers.CRM.Permissions;

public class CRMPermissionDefinitionProvider : PermissionDefinitionProvider
{
	public override void Define(IPermissionDefinitionContext context)
	{
		PermissionGroupDefinition crmGroup = context.AddGroup(CRMPermissions.GroupName, L("Permission:CRM"));

		PermissionDefinition companiesPermission = crmGroup.AddPermission(
			CRMPermissions.Companies.Default,
			L($"Permission:{nameof(CRMPermissions.Companies)}"));
		companiesPermission.AddChild(
			CRMPermissions.Companies.Create,
			L($"Permission:{nameof(CRMPermissions.Companies.Create)}"));
		companiesPermission.AddChild(
			CRMPermissions.Companies.Update,
			L($"Permission:{nameof(CRMPermissions.Companies.Update)}"));
		companiesPermission.AddChild(
			CRMPermissions.Companies.Delete,
			L($"Permission:{nameof(CRMPermissions.Companies.Delete)}"));

		PermissionDefinition contactsPermission = crmGroup.AddPermission(
			CRMPermissions.Contacts.Default,
			L($"Permission:{nameof(CRMPermissions.Contacts)}"));
		contactsPermission.AddChild(
			CRMPermissions.Contacts.Create,
			L($"Permission:{nameof(CRMPermissions.Contacts.Create)}"));
		contactsPermission.AddChild(
			CRMPermissions.Contacts.Update,
			L($"Permission:{nameof(CRMPermissions.Contacts.Update)}"));
		contactsPermission.AddChild(
			CRMPermissions.Contacts.Delete,
			L($"Permission:{nameof(CRMPermissions.Contacts.Delete)}"));
	}

	private static LocalizableString L(string name)
	{
		return LocalizableString.Create<CRMResource>(name);
	}
}
