using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OctoFlashcardStudy.API.Domain.Entities;
using OctoFlashcardStudy.API.Domain.Enums;

namespace OctoFlashcardStudy.API.Data.Configurations
{
    public class DeckConfiguration : IEntityTypeConfiguration<Deck>
    {
        public void Configure(EntityTypeBuilder<Deck> builder)
        {
            //table
            builder.ToTable("Decks");

            //primary key
            builder.HasKey(x => x.Id);

            //properties
            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Description)
                .HasMaxLength(500);

            builder.Property(x => x.Visibility)
                .IsRequired()
                .HasDefaultValue(DeckVisibility.Private);

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.Property(x => x.UpdatedAt)
                .IsRequired();

            //indexes
            builder.HasIndex(x => x.OwnerId);

            //one user cannot have duplicate deck names
            builder.HasIndex(x => new
            {
                x.OwnerId,
                x.Name
            })
            .IsUnique();
        }
    }
}