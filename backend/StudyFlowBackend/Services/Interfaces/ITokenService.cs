using System;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user, bool rememberMe);
        DateTime GetExpiration(bool rememberMe);
    }
}
