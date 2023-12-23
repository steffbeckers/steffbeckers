namespace SteffBeckers.CRM;

public static class CRMErrorCodes
{
	public static class Companies
	{
		public const string NotFound = _prefix + nameof(NotFound);

		private const string _prefix = $"{nameof(Companies)}:";
	}
}
