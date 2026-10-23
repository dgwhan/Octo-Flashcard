using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Repositories.Implementations
{
    public class PetRepository : BaseRepository<StudyPet>, IPetRepository
    {
        public PetRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<StudyPet?> GetPetByUserIdAsync(string userId)
        {
            return await _context.StudyPets
                .FirstOrDefaultAsync(p => p.UserId == userId);
        }
    }
}
