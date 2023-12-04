using SteffBeckers.CRM.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace SteffBeckers.CRM;

public abstract class CRMController : AbpControllerBase
{
    protected CRMController()
    {
        LocalizationResource = typeof(CRMResource);
    }
}
