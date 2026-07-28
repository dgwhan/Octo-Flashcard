using OctoFlashcardStudy.API.Services.Auth;

namespace OctoFlashcardStudy.API.Extensions.DependencyInjection
{
    public static class AuthModuleExtensions
    {
        public static IServiceCollection AddAuthModule(
            this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IJwtTokenService, JwtTokenService>();
            services.AddScoped<PasswordHasherService>();

            return services;
        }
    }
}
