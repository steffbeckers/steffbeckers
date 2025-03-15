using Microsoft.AspNetCore.Builder;
using MyCompany.MyProject;
using Volo.Abp.AspNetCore.TestBase;

var builder = WebApplication.CreateBuilder();
builder.Environment.ContentRootPath = GetWebProjectContentRootPathHelper.Get("MyCompany.MyProject.Web.csproj"); 
await builder.RunAbpModuleAsync<MyProjectWebTestModule>(applicationName: "MyCompany.MyProject.Web");

public partial class Program
{
}
