using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyFlowBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddScanFeatureAndStorageQuota : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "StorageQuotaBytes",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "StorageUsedBytes",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "ScannedDocuments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    ExtractedText = table.Column<string>(type: "text", nullable: false),
                    OriginalImageUrl = table.Column<string>(type: "text", nullable: true),
                    StoragePath = table.Column<string>(type: "text", nullable: true),
                    ImageSizeBytes = table.Column<long>(type: "bigint", nullable: false),
                    TextSizeBytes = table.Column<long>(type: "bigint", nullable: false),
                    DetectedLanguage = table.Column<string>(type: "text", nullable: false),
                    ConfidenceScore = table.Column<double>(type: "double precision", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScannedDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScannedDocuments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScannedDocuments_UserId",
                table: "ScannedDocuments",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScannedDocuments");

            migrationBuilder.DropColumn(
                name: "StorageQuotaBytes",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StorageUsedBytes",
                table: "Users");
        }
    }
}
