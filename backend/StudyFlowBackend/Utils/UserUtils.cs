using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Utils
{
    public class UserUtils : IUserUtils
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppDbContext _dbContext;

        public UserUtils(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        public string? GetCurrentUserId()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null) return null;

            // Lấy từ ClaimTypes.NameIdentifier (thường dùng cho Firebase / Identity) hoặc "user_id"
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                         ?? user.FindFirst("user_id")?.Value;
            
            return userId;
        }

        public async Task<User?> GetCurrentUserAsync()
        {
            var userId = GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return null;

            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
