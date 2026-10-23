using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Giao diện dịch vụ quản lý Study Pet (thú cưng học tập).
    /// </summary>
    public interface IPetService
    {
        /// <summary>
        /// Lấy thông tin thú cưng của người dùng.
        /// </summary>
        /// <param name="userId">ID người dùng.</param>
        Task<StudyPet?> GetPetAsync(string userId);

        /// <summary>
        /// Nhận nuôi một thú cưng mới.
        /// </summary>
        /// <param name="userId">ID người dùng.</param>
        /// <param name="name">Tên của Pet.</param>
        /// <param name="petType">Loại Pet (ví dụ: "Cat", "Dog", "Panda").</param>
        Task<StudyPet> AdoptPetAsync(string userId, string name, string petType);

        /// <summary>
        /// Cho thú cưng ăn. Tốn 10 Coins, tăng chỉ số Hunger (no bụng) và EXP của Pet.
        /// </summary>
        /// <param name="userId">ID người dùng.</param>
        Task<StudyPet> FeedPetAsync(string userId);

        /// <summary>
        /// Tương tác/chơi đùa với thú cưng để tăng EXP cho Pet.
        /// </summary>
        /// <param name="userId">ID người dùng.</param>
        Task<StudyPet> InteractWithPetAsync(string userId);
    }
}
