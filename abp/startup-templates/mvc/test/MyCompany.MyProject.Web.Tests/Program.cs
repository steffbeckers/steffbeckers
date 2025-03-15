using Microsoft.AspNetCore.Builder;
using MyCompany.MyProject;
using Volo.Abp.AspNetCore.TestBase;

var builder = WebApplication.CreateBuilder();
await builder.RunAbpModuleAsync<MyProjectWebTestModule>();

public partial class Program
{
}
