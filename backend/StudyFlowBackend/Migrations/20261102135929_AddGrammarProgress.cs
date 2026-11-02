using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyFlowBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddGrammarProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GrammarProgresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    TopicId = table.Column<string>(type: "text", nullable: false),
                    IsTheoryCompleted = table.Column<bool>(type: "boolean", nullable: false),
                    IsPracticeCompleted = table.Column<bool>(type: "boolean", nullable: false),
                    PracticeScore = table.Column<int>(type: "integer", nullable: false),
                    PracticeTotalQuestions = table.Column<int>(type: "integer", nullable: false),
                    PracticeCorrectAnswers = table.Column<int>(type: "integer", nullable: false),
                    IsReviewCompleted = table.Column<bool>(type: "boolean", nullable: false),
                    MasteryScore = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastStudiedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrammarProgresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrammarProgresses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GrammarProgresses_UserId_TopicId",
                table: "GrammarProgresses",
                columns: new[] { "UserId", "TopicId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GrammarProgresses");
        }
    }
}
