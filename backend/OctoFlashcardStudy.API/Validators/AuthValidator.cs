using OctoFlashcardStudy.API.Contracts.Auth;
using OctoFlashcardStudy.API.Exceptions;

namespace OctoFlashcardStudy.API.Validators
{
    public class AuthValidator
    {
        public static void ValidateRegister(RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username))
                throw new ApiException(
                    "Username is required",
                    StatusCodes.Status400BadRequest);

            if (string.IsNullOrWhiteSpace(request.Email))
                throw new ApiException(
                    "Email is required",
                    StatusCodes.Status400BadRequest);

            if (string.IsNullOrWhiteSpace(request.Password))
                throw new ApiException(
                    "Password is required",
                    StatusCodes.Status400BadRequest);

            if (request.Password.Length < 8)
                throw new ApiException(
                    "Password must be at least 8 characters long",
                    StatusCodes.Status400BadRequest);
        }

        public static void ValidateLogin(LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Identifier))
                throw new ApiException(
                    "Identifier is required",
                    StatusCodes.Status400BadRequest);

            if (string.IsNullOrWhiteSpace(request.Password))
                throw new ApiException(
                    "Password is required",
                    StatusCodes.Status400BadRequest);
        }
    }
}