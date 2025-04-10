using Localization.Resources.AbpUi;
using SteffBeckers.Localization;
using Volo.Abp.Account;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.HttpApi;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using SteffBeckers.CRM;
using SteffBeckers.Inventory;

namespace SteffBeckers;

[DependsOn(
    typeof(SteffBeckersApplicationContractsModule),
    typeof(AbpAccountHttpApiModule),
    typeof(AbpIdentityHttpApiModule),
    typeof(AbpPermissionManagementHttpApiModule),
    typeof(AbpTenantManagementHttpApiModule),
    typeof(AbpFeatureManagementHttpApiModule),
    typeof(AbpSettingManagementHttpApiModule)
    )]
[DependsOn(typeof(CRMHttpApiModule))]
    [DependsOn(typeof(InventoryHttpApiModule))]
    public class SteffBeckersHttpApiModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        ConfigureLocalization();
    }

    private void ConfigureLocalization()
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Get<SteffBeckersResource>()
                .AddBaseTypes(
                    typeof(AbpUiResource)
                );
        });
    }
}
