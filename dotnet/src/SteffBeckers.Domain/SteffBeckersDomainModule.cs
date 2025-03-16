using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using SteffBeckers.CRM;
using SteffBeckers.MultiTenancy;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.OpenIddict;
using Volo.Abp.PermissionManagement.Identity;
using Volo.Abp.PermissionManagement.OpenIddict;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using SteffBeckers.Inventory;

namespace SteffBeckers;

[DependsOn(
	typeof(SteffBeckersDomainSharedModule),
	typeof(AbpAuditLoggingDomainModule),
	typeof(AbpBackgroundJobsDomainModule),
	typeof(AbpFeatureManagementDomainModule),
	typeof(AbpIdentityDomainModule),
	typeof(AbpOpenIddictDomainModule),
	typeof(AbpPermissionManagementDomainOpenIddictModule),
	typeof(AbpPermissionManagementDomainIdentityModule),
	typeof(AbpSettingManagementDomainModule),
	typeof(AbpTenantManagementDomainModule),
	typeof(AbpEmailingModule)
)]
[DependsOn(typeof(CRMDomainModule))]
[DependsOn(typeof(InventoryDomainModule))]
    public class SteffBeckersDomainModule : AbpModule
{
	public override void ConfigureServices(ServiceConfigurationContext context)
	{
		Configure<AbpLocalizationOptions>(options =>
		{
			options.Languages.Add(new LanguageInfo("en", "en", "English", "gb"));
			options.Languages.Add(new LanguageInfo("nl", "nl", "Nederlands", "nl"));
		});

		Configure<AbpMultiTenancyOptions>(options =>
		{
			options.IsEnabled = MultiTenancyConsts.IsEnabled;
		});

#if DEBUG
		context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif
	}
}
