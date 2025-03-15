using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;
using Microsoft.Extensions.Localization;
using MyCompany.MyProject.Localization;

namespace MyCompany.MyProject.Web;

[Dependency(ReplaceServices = true)]
public class MyProjectBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<MyProjectResource> _localizer;

    public MyProjectBrandingProvider(IStringLocalizer<MyProjectResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
