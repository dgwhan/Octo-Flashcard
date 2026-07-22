using Microsoft.EntityFrameworkCore;
using OctoFlashcardStudy.API.Contracts.Auth;
using OctoFlashcardStudy.API.Data;
using OctoFlashcardStudy.API.Domain.Entities;
using OctoFlashcardStudy.API.Exceptions;

namespace OctoFlashcardStudy.API.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasherService _passwordHasher;

        public AuthService (ApplicationDbContext context, PasswordHasherService passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
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

            //create user
            var user = new User
            {
                Username = request.Username,
                Email = email,
                IsActive = true,
                CreateAt = DateTime.UtcNow,
                UpdateAt = DateTime.UtcNow
            };

            //hash password
            user.PasswordHash = _passwordHasher.HashPassword(
                user, request.Password);

            //save database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            //return respone
            return new RegisterResponse
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                CreatedAt = user.CreateAt
            };
                    
        }
    }
}
