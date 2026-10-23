using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;
using StudyFlowBackend.Services.Interfaces;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            IUserRepository userRepository,
            ITokenService tokenService,
            ILogger<AuthService> logger)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task<ApiResponse<RegisterResponseDto>> RegisterAsync(RegisterRequestDto request)
        {
            var normalizedEmail = request.Email.Trim().ToLower();
            var trimmedUsername = request.Username.Trim();

            // Check if username already exists
            if (await _userRepository.ExistsByUsernameAsync(trimmedUsername))
            {
                return ApiResponse<RegisterResponseDto>.ErrorResponse("Username already exists");
            }

            // Check if email already exists
            if (await _userRepository.ExistsByEmailAsync(normalizedEmail))
            {
                return ApiResponse<RegisterResponseDto>.ErrorResponse("Email already exists");
            }

            // Hash password with BCrypt
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var newUser = new User
            {
                Id = Guid.NewGuid().ToString(),
                Username = trimmedUsername,
                Email = normalizedEmail,
                PasswordHash = passwordHash,
                FullName = trimmedUsername,
                AvatarUrl = string.Empty,
                Timezone = "Asia/Ho_Chi_Minh",
                Streak = 0,
                Level = 1,
                ExpPoints = 0,
                Coins = 0,
                DailyTargetMinutes = 60,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(newUser);
            await _userRepository.SaveChangesAsync();

            _logger.LogInformation("New user registered successfully: {Username} ({Email})", newUser.Username, newUser.Email);

            var responseDto = new RegisterResponseDto
            {
                Id = newUser.Id,
                Username = newUser.Username,
                Email = newUser.Email,
                CreatedAt = newUser.CreatedAt
            };

            return ApiResponse<RegisterResponseDto>.SuccessResponse(responseDto, "User registered successfully");
        }

        public async Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginRequestDto request)
        {
            var identifier = request.Identifier.Trim();
            var user = await _userRepository.GetByIdentifierAsync(identifier);

            if (user == null || string.IsNullOrEmpty(user.PasswordHash))
            {
                _logger.LogWarning("Login failed for identifier: {Identifier} - user not found or has no password", identifier);
                return ApiResponse<LoginResponseDto>.ErrorResponse("Invalid username/email or password");
            }

            // Verify password hash
            var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isPasswordValid)
            {
                _logger.LogWarning("Login failed for user: {Username} - password mismatch", user.Username);
                return ApiResponse<LoginResponseDto>.ErrorResponse("Invalid username/email or password");
            }

            // Generate JWT Token
            var token = _tokenService.GenerateToken(user, request.RememberMe);
            var expiresAt = _tokenService.GetExpiration(request.RememberMe);

            _logger.LogInformation("User logged in successfully: {Username} ({Id})", user.Username, user.Id);

            var responseDto = new LoginResponseDto
            {
                AccessToken = token,
                ExpiresAt = expiresAt,
                UserId = user.Id,
                Username = user.Username,
                Email = user.Email
            };

            return ApiResponse<LoginResponseDto>.SuccessResponse(responseDto, "Login successful");
        }

        public async Task<ApiResponse<CurrentUserResponseDto>> GetCurrentUserAsync(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return ApiResponse<CurrentUserResponseDto>.ErrorResponse("User not found");
            }

            var responseDto = new CurrentUserResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FullName = user.FullName,
                AvatarUrl = user.AvatarUrl,
                Level = user.Level,
                ExpPoints = user.ExpPoints,
                Streak = user.Streak,
                Coins = user.Coins,
                Timezone = user.Timezone
            };

            return ApiResponse<CurrentUserResponseDto>.SuccessResponse(responseDto);
        }
    }
}
