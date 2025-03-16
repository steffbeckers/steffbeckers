using Marten;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;
using Weasel.Core;

namespace SteffBeckers.Marten;

public class SteffBeckersMartenModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddMarten(options =>
        {
            options.Connection(context.Services.GetConfiguration().GetConnectionString("Marten")!);
            options.UseSystemTextJsonForSerialization();

            if (context.Services.GetAbpHostEnvironment().IsDevelopment())
            {
                options.AutoCreateSchemaObjects = AutoCreate.All;
            }
        });
    }
}