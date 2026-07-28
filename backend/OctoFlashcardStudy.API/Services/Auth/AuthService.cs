using Microsoft.EntityFrameworkCore;
using OctoFlashcardStudy.API.Contracts.Auth;
using OctoFlashcardStudy.API.Data;
using OctoFlashcardStudy.API.Domain.Entities;
using OctoFlashcardStudy.API.Exceptions;
using OctoFlashcardStudy.API.Validators;

namespace OctoFlashcardStudy.API.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasherService _passwordHasher;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthService (ApplicationDbContext context, PasswordHasherService passwordHasher, IJwtTokenService jwtTokenService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _jwtTokenService = jwtTokenService;
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            AuthValidator.ValidateRegister(request);

            //normalize email
            var email = request.Email.Trim().ToLowerInvariant();

            //check email exsits
            var emailExists = await _context.Users
                .AnyAsync(x => x.Email == email);

            if (emailExists)
            {
                throw new ApiException("Email already exists",
                    StatusCodes.Status409Conflict);      
            }

            using var tx = await _context.Database.BeginTransactionAsync();

            try
            {
                //create user
                var user = new User
                {
                    Username = request.Username,
                    Email = email,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                //hash password
                user.PasswordHash = _passwordHasher.HashPassword(
                    user, request.Password);

                //save database
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                await tx.CommitAsync();

                //return respone
                return new RegisterResponse
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    CreatedAt = user.CreatedAt
                };

            }
            catch (Exception ex) 
            {
                await tx.RollbackAsync();
                throw;
            }
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            AuthValidator.ValidateLogin(request);

            //normalize identifier
            var normalizedIdentifier = request.Identifier
                .Trim()
                .ToLowerInvariant();

            //find user
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Username == normalizedIdentifier || x.Email == normalizedIdentifier);

            if (user == null)
            {
                throw new ApiException("Invalid credentials", StatusCodes.Status401Unauthorized);
            }

            //check password
            var isPasswordValid = _passwordHasher.VerifyPassword(user, user.PasswordHash, request.Password);

            if (!isPasswordValid)
            {
                throw new ApiException(
                    "Invalid credentials.",
                    StatusCodes.Status401Unauthorized);
            }

            //generate jwt
            var token = _jwtTokenService.GenerateToken(user);

            return new LoginResponse
            {
                AccessToken = token.AccessToken,
                ExpiresAt = token.ExpiresAt,
                UserId = user.Id,
                Username = user.Username,
                Email = user.Email
            };
        }

    }
}
