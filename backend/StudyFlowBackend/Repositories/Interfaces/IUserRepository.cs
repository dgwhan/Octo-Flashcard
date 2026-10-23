using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> GetByIdAsync(string id, bool includeRelations = false);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByIdentifierAsync(string identifier);
        Task<bool> ExistsByEmailAsync(string email);
        Task<bool> ExistsByUsernameAsync(string username);
        Task<List<User>> GetLeaderboardUsersAsync(int limit, string sortBy);
        Task<int> GetUserRankAsync(User currentUser, string sortBy);
    }
}
