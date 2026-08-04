using OctoFlashcardStudy.API.Services.Decks;

namespace OctoFlashcardStudy.API.Extensions.DependencyInjection
{
    public static class DeckModuleExtensions
    {
        public static IServiceCollection AddDeckModule(
            this IServiceCollection services)
        {
            services.AddScoped<IDeckService, DeckService>();

            return services;
        }
    }
}
