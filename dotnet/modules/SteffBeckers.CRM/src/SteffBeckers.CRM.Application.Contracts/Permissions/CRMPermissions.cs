using Volo.Abp.Reflection;

namespace SteffBeckers.CRM.Permissions;

public class CRMPermissions
{
	public const string GroupName = "CRM";

	public static string[] GetAll()
	{
		return ReflectionHelper.GetPublicConstantsRecursively(typeof(CRMPermissions));
	}

	public static class Companies
	{
		public const string Create = Default + $".{nameof(Create)}";
		public const string Default = GroupName + $".{nameof(Companies)}";
		public const string Delete = Default + $".{nameof(Delete)}";
		public const string Update = Default + $".{nameof(Update)}";
	}
}
