using Microsoft.EntityFrameworkCore;
using OctoFlashcardStudy.API.Domain.Entities;

namespace OctoFlashcardStudy.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; } = null!;
    }
}
