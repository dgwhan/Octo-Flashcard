using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StudyFlowBackend.Models;
using StudyFlowBackend.Services.Interfaces;

namespace StudyFlowBackend.Services.Implementations
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DateTime GetExpiration(bool rememberMe)
        {
            // If rememberMe, token is valid for 14 days, otherwise 1 day
            return rememberMe ? DateTime.UtcNow.AddDays(14) : DateTime.UtcNow.AddDays(1);
        }

        public string GenerateToken(User user, bool rememberMe)
        {
            var secretKey = _configuration["Jwt:Key"] ?? "StudyFlowOctoFlashcardSuperSecretKey2026!@#$%^&*()_+";
            var issuer = _configuration["Jwt:Issuer"] ?? "StudyFlowBackend";
            var audience = _configuration["Jwt:Audience"] ?? "StudyFlowFrontend";

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("user_id", user.Id),
                new Claim("userId", user.Id),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var expires = GetExpiration(rememberMe);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expires,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
