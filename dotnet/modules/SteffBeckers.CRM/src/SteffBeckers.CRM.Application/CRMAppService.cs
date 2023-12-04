using SteffBeckers.CRM.Localization;
using Volo.Abp.Application.Services;

namespace SteffBeckers.CRM;

public abstract class CRMAppService : ApplicationService
{
    protected CRMAppService()
    {
        LocalizationResource = typeof(CRMResource);
        ObjectMapperContext = typeof(CRMApplicationModule);
    }
}
