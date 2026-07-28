using OctoFlashcardStudy.API.Contracts.Auth;
using OctoFlashcardStudy.API.Exceptions;

namespace OctoFlashcardStudy.API.Validators
{
    public class AuthValidator
    {
        public static void ValidateRegister(RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username))
                throw new ApplicationException("Username is required");

            if (string.IsNullOrWhiteSpace(request.Email))
                throw new ApplicationException("Email is required");

            if (string.IsNullOrWhiteSpace(request.Password))
                throw new ApplicationException("Password is required");

            if (request.Password.Length < 8)
                throw new ApplicationException("Password must be at least 8 characters long");
        }

        public static void ValidateLogin(LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Identifier))
                throw new ApplicationException("Email is required");

            if (string.IsNullOrWhiteSpace(request.Password))
                throw new ApplicationException("Password is required");
        }
    }
}
