using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Giao diện dịch vụ tính toán bảng xếp hạng (Leaderboard) người dùng.
    /// </summary>
    public interface ILeaderboardService
    {
        /// <summary>
        /// Lấy bảng xếp hạng toàn cầu dựa trên tiêu chí sắp xếp.
        /// </summary>
        /// <param name="limit">Giới hạn số lượng bản ghi trả về (ví dụ: top 20).</param>
        /// <param name="sortBy">Tiêu chí: "Level" (Cấp độ), "Achievements" (Thành tích), "Pet" (Cấp độ Thú cưng).</param>
        Task<List<LeaderboardEntryDto>> GetGlobalLeaderboardAsync(int limit, string sortBy);

        /// <summary>
        /// Lấy thứ hạng hiện tại của người dùng dựa trên tiêu chí sắp xếp.
        /// </summary>
        /// <param name="userId">ID người dùng.</param>
        /// <param name="sortBy">Tiêu chí sắp xếp.</param>
        Task<int> GetUserRankAsync(string userId, string sortBy);
    }
}
