using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using OpenIddict.Server.AspNetCore;
using OpenIddict.Validation.AspNetCore;
using SteffBeckers.EntityFrameworkCore;
using SteffBeckers.MultiTenancy;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.Account.Web;
using Volo.Abp.AspNetCore.MultiTenancy;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.LeptonXLite;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.LeptonXLite.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;
using Volo.Abp.Security.Claims;
using Volo.Abp.Swashbuckle;
using Volo.Abp.UI.Navigation.Urls;
using Volo.Abp.VirtualFileSystem;

namespace SteffBeckers;

[DependsOn(
	typeof(SteffBeckersHttpApiModule),
	typeof(AbpAutofacModule),
	typeof(AbpAspNetCoreMultiTenancyModule),
	typeof(SteffBeckersApplicationModule),
	typeof(SteffBeckersEntityFrameworkCoreModule),
	typeof(AbpAspNetCoreMvcUiLeptonXLiteThemeModule),
	typeof(AbpAccountWebOpenIddictModule),
	typeof(AbpAspNetCoreSerilogModule),
	typeof(AbpSwashbuckleModule)
)]
public class SteffBeckersHttpApiHostModule : AbpModule
{
	public override void PreConfigureServices(ServiceConfigurationContext context)
	{
		PreConfigure<OpenIddictBuilder>(builder =>
		{
			builder.AddValidation(options =>
			{
				options.AddAudiences("SteffBeckers");
				options.UseLocalServer();
				options.UseAspNetCore();
			});
		});
	}

	public override void PostConfigureServices(ServiceConfigurationContext context)
	{
		PostConfigure<SwaggerGenOptions>(options =>
		{
			OpenApiSecurityScheme? oauth2SecurityScheme = options.SwaggerGeneratorOptions.SecuritySchemes["oauth2"];

			if (oauth2SecurityScheme != null)
			{
				oauth2SecurityScheme.Flows.AuthorizationCode.AuthorizationUrl = new Uri($"/connect/authorize", UriKind.Relative);
				oauth2SecurityScheme.Flows.AuthorizationCode.TokenUrl = new Uri($"/connect/token", UriKind.Relative);
			}
		});
	}

	public override void ConfigureServices(ServiceConfigurationContext context)
	{
		IConfiguration configuration = context.Services.GetConfiguration();
		IWebHostEnvironment hostingEnvironment = context.Services.GetHostingEnvironment();

		ConfigureAuthentication(context);
		ConfigureBundles();
		ConfigureUrls(configuration);
		ConfigureConventionalControllers();
		ConfigureVirtualFileSystem(context);
		ConfigureCors(context, configuration);
		ConfigureSwaggerServices(context, configuration);
		ConfigureForwardedHeaders();
	}

	private void ConfigureForwardedHeaders()
	{
		Configure<ForwardedHeadersOptions>(options =>
		{
			options.ForwardedHeaders = ForwardedHeaders.XForwardedProto;
		});
	}

	private void ConfigureAuthentication(ServiceConfigurationContext context)
	{
		IConfiguration configuration = context.Services.GetConfiguration();

		if (!configuration.GetValue<bool>("AuthServer:RequireHttpsMetadata"))
		{
			Configure<OpenIddictServerAspNetCoreOptions>(options =>
			{
				options.DisableTransportSecurityRequirement = true;
			});
		}

		context.Services.ForwardIdentityAuthenticationForBearer(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);

		context.Services.Configure<AbpClaimsPrincipalFactoryOptions>(options =>
		{
			options.IsDynamicClaimsEnabled = true;
		});
	}

	private void ConfigureBundles()
	{
		Configure<AbpBundlingOptions>(options =>
		{
			options.StyleBundles.Configure(
				LeptonXLiteThemeBundles.Styles.Global,
				bundle =>
				{
					bundle.AddFiles("/global-styles.css");
				}
			);
		});
	}

	private void ConfigureUrls(IConfiguration configuration)
	{
		Configure<AppUrlOptions>(options =>
		{
			options.Applications["MVC"].RootUrl = configuration["App:SelfUrl"];
			options.RedirectAllowedUrls.AddRange(configuration["App:RedirectAllowedUrls"]?.Split(',') ?? Array.Empty<string>());

			options.Applications["Angular"].RootUrl = configuration["App:ClientUrl"];
			options.Applications["Angular"].Urls[AccountUrlNames.PasswordReset] = "account/reset-password";
		});
	}

	private void ConfigureVirtualFileSystem(ServiceConfigurationContext context)
	{
		IWebHostEnvironment hostingEnvironment = context.Services.GetHostingEnvironment();

		if (hostingEnvironment.IsDevelopment())
		{
			Configure<AbpVirtualFileSystemOptions>(options =>
			{
				options.FileSets.ReplaceEmbeddedByPhysical<SteffBeckersDomainSharedModule>(
					Path.Combine(hostingEnvironment.ContentRootPath,
						$"..{Path.DirectorySeparatorChar}SteffBeckers.Domain.Shared"));
				options.FileSets.ReplaceEmbeddedByPhysical<SteffBeckersDomainModule>(
					Path.Combine(hostingEnvironment.ContentRootPath,
						$"..{Path.DirectorySeparatorChar}SteffBeckers.Domain"));
				options.FileSets.ReplaceEmbeddedByPhysical<SteffBeckersApplicationContractsModule>(
					Path.Combine(hostingEnvironment.ContentRootPath,
						$"..{Path.DirectorySeparatorChar}SteffBeckers.Application.Contracts"));
				options.FileSets.ReplaceEmbeddedByPhysical<SteffBeckersApplicationModule>(
					Path.Combine(hostingEnvironment.ContentRootPath,
						$"..{Path.DirectorySeparatorChar}SteffBeckers.Application"));
			});
		}
	}

	private void ConfigureConventionalControllers()
	{
		Configure<AbpAspNetCoreMvcOptions>(options =>
		{
			options.ConventionalControllers.Create(typeof(SteffBeckersApplicationModule).Assembly);
		});
	}

	private static void ConfigureSwaggerServices(ServiceConfigurationContext context, IConfiguration configuration)
	{
		context.Services.AddAbpSwaggerGenWithOAuth(
			configuration["AuthServer:Authority"]!,
			new Dictionary<string, string>
			{
				{ "SteffBeckers", "SteffBeckers API" }
			},
			options =>
			{
				options.SwaggerDoc("v1", new OpenApiInfo { Title = "Steff Beckers API", Version = "v1" });
				options.DocInclusionPredicate((docName, description) => true);
				options.CustomSchemaIds(type => type.FullName);
			});
	}

	private void ConfigureCors(ServiceConfigurationContext context, IConfiguration configuration)
	{
		context.Services.AddCors(options =>
		{
			options.AddDefaultPolicy(builder =>
			{
				builder
					.WithOrigins(configuration["App:CorsOrigins"]?
						.Split(",", StringSplitOptions.RemoveEmptyEntries)
						.Select(o => o.RemovePostFix("/"))
						.ToArray() ?? Array.Empty<string>())
					.WithAbpExposedHeaders()
					.SetIsOriginAllowedToAllowWildcardSubdomains()
					.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowCredentials();
			});
		});
	}

	public override void OnApplicationInitialization(ApplicationInitializationContext context)
	{
		IApplicationBuilder app = context.GetApplicationBuilder();
		IWebHostEnvironment env = context.GetEnvironment();

		if (env.IsDevelopment())
		{
			app.UseDeveloperExceptionPage();
		}

		app.UseForwardedHeaders();
		app.UseAbpRequestLocalization();

		if (!env.IsDevelopment())
		{
			app.UseErrorPage();
		}

		app.UseCorrelationId();
		app.UseStaticFiles();
		app.UseRouting();
		app.UseCors();
		app.UseAuthentication();
		app.UseAbpOpenIddictValidation();

		if (MultiTenancyConsts.IsEnabled)
		{
			app.UseMultiTenancy();
		}
		app.UseUnitOfWork();
		app.UseDynamicClaims();
		app.UseAuthorization();

		app.UseSwagger();
		app.UseAbpSwaggerUI(c =>
		{
			c.SwaggerEndpoint("/swagger/v1/swagger.json", "Steff Beckers API");

			IConfiguration configuration = context.ServiceProvider.GetRequiredService<IConfiguration>();
			c.OAuthClientId(configuration["AuthServer:SwaggerClientId"]);
			c.OAuthScopes("SteffBeckers");
		});

		app.UseAuditing();
		app.UseAbpSerilogEnrichers();
		app.UseConfiguredEndpoints();
	}
}
