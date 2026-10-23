using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyFlowBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddImageDataToScannedDocument : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StoragePath",
                table: "ScannedDocuments");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageData",
                table: "ScannedDocuments",
                type: "bytea",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageData",
                table: "ScannedDocuments");

            migrationBuilder.AddColumn<string>(
                name: "StoragePath",
                table: "ScannedDocuments",
                type: "text",
                nullable: true);
        }
    }
}
