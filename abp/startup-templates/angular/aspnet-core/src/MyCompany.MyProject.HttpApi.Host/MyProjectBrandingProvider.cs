using Microsoft.Extensions.Localization;
using MyCompany.MyProject.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace MyCompany.MyProject;

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
