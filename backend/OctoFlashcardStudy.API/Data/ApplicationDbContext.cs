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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Enforce uniqueness at the database level.
            // The service-layer AnyAsync check is a fast-path guard;
            // this index is the true race-condition safeguard.
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
