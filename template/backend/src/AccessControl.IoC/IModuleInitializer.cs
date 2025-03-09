using Microsoft.AspNetCore.Builder;

namespace AccessControl.IoC;

public interface IModuleInitializer
{
    void Initialize(WebApplicationBuilder builder);
}
