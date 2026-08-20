    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using OctoFlashcardStudy.API.Domain.Entities;

    namespace OctoFlashcardStudy.API.Data.Configurations
    {
        public class FlashCardConfiguration : IEntityTypeConfiguration<FlashCard>
        {
            public void Configure(EntityTypeBuilder<FlashCard> builder)
            {
                //table
                builder.ToTable("FlashCard");

                //primary key
                builder.HasKey(x => x.Id);

                //properties
                builder.Property(x => x.Id)
                    .ValueGeneratedNever();

                builder.Property(x => x.Term)
                    .IsRequired()
                    .HasMaxLength(500);

                builder.Property(x => x.Definition)
                    .IsRequired()
                    .HasMaxLength(2000);

                builder.Property(x => x.TermLanguage)
                    .IsRequired()
                    .HasMaxLength(20);

                builder.Property(x => x.DefinitionLanguage)
                    .IsRequired()
                    .HasMaxLength(20);

                builder.Property(x => x.CreatedAt)
                    .IsRequired();

                builder.Property(x => x.UpdatedAt)
                    .IsRequired();

                //relationship
                builder.HasOne(x => x.Deck)
                    .WithMany(x => x.FlashCards)
                    .HasForeignKey(x => x.DeckId)
                    .OnDelete(DeleteBehavior.Cascade);

                //index
                builder.HasIndex(x => x.DeckId);

            }
        }
    }
