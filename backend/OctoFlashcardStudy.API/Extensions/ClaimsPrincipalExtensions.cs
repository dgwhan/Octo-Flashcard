using System.Security.Claims;
using OctoFlashcardStudy.API.Exceptions;

namespace OctoFlashcardStudy.API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ApiException("Invalid credentials", StatusCodes.Status500InternalServerError);
            }
            return Guid.Parse(userId);
        }
    }
}
