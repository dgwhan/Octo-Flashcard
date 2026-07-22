using Microsoft.AspNetCore.Identity;
using OctoFlashcardStudy.API.Domain.Entities;

namespace OctoFlashcardStudy.API.Services
{
    public class PasswordHasherService
    {
        private readonly PasswordHasher<User> _passwordHasher = new();

        public string HashPassword(User user, String password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        public bool VerifyPassword(User user, String password, string passwordHash)
        {
            var result = _passwordHasher.VerifyHashedPassword(
                user,
                passwordHash,
                password);

            return result == PasswordVerificationResult.Success
                || result == PasswordVerificationResult.Failed;
        }
    }
}
