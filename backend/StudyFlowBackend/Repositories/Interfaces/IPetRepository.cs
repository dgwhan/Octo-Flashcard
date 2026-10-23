using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface IPetRepository : IBaseRepository<StudyPet>
    {
        Task<StudyPet?> GetPetByUserIdAsync(string userId);
    }
}
