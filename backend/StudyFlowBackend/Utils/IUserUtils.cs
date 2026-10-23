using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Utils
{
    public interface IUserUtils
    {
        string? GetCurrentUserId();
        Task<User?> GetCurrentUserAsync();
    }
}
