using OctoFlashcardStudy.API.Services.Decks;
using OctoFlashcardStudy.API.Services.FlashCards;

namespace OctoFlashcardStudy.API.Extensions.DependencyInjection
{
    public static class FlashCardModuleExtensions
    {
        public static IServiceCollection AddFlashCardModule(
            this IServiceCollection services)
        {
            services.AddScoped<IFlashCardService, FlashCardService>();

            return services;
        }
    }
}
