using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StudyFlowBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddGamificationTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Coins",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Badges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IconUrl = table.Column<string>(type: "text", nullable: false),
                    MetricType = table.Column<string>(type: "text", nullable: false),
                    ThresholdValue = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Badges", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudyPets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    PetType = table.Column<string>(type: "text", nullable: false),
                    Level = table.Column<int>(type: "integer", nullable: false),
                    Exp = table.Column<double>(type: "double precision", nullable: false),
                    EvolutionStage = table.Column<string>(type: "text", nullable: false),
                    Hunger = table.Column<int>(type: "integer", nullable: false),
                    LastFedTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyPets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudyPets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserBadges",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    BadgeId = table.Column<Guid>(type: "uuid", nullable: false),
                    EarnedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBadges", x => new { x.UserId, x.BadgeId });
                    table.ForeignKey(
                        name: "FK_UserBadges_Badges_BadgeId",
                        column: x => x.BadgeId,
                        principalTable: "Badges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBadges_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Badges",
                columns: new[] { "Id", "CreatedAt", "Description", "IconUrl", "MetricType", "Name", "ThresholdValue" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2491), "Đạt cấp độ 5", "school", "Level", "Tân Binh Tập Sự", 5 },
                    { new Guid("22222222-2222-2222-2222-222222222222"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2505), "Đạt cấp độ 10", "workspace_premium", "Level", "Học Giả Nghiêm Túc", 10 },
                    { new Guid("33333333-3333-3333-3333-333333333333"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2508), "Đạt cấp độ 20", "psychology", "Level", "Bậc Thầy Trí Tuệ", 20 },
                    { new Guid("44444444-4444-4444-4444-444444444444"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2510), "Đạt cấp độ 50", "military_tech", "Level", "Học Giả Vĩ Đại", 50 },
                    { new Guid("55555555-5555-5555-5555-555555555555"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2512), "Tập trung học tập tổng cộng 1 giờ (60 phút)", "timer", "FocusMinutes", "Khởi Đầu Tập Trung", 60 },
                    { new Guid("66666666-6666-6666-6666-666666666666"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2514), "Tập trung học tập tổng cộng 10 giờ (600 phút)", "hourglass_full", "FocusMinutes", "Chiến Binh Tập Trung", 600 },
                    { new Guid("77777777-7777-7777-7777-777777777777"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2518), "Tập trung học tập tổng cộng 50 giờ (3000 phút)", "self_improvement", "FocusMinutes", "Thiền Sư Học Tập", 3000 },
                    { new Guid("88888888-8888-8888-8888-888888888888"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2521), "Tập trung học tập tổng cộng 100 giờ (6000 phút)", "local_fire_department", "FocusMinutes", "Bậc Thầy Tập Trung", 6000 },
                    { new Guid("99999999-9999-9999-9999-999999999999"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2525), "Hoàn thành 1 nhiệm vụ đầu tiên", "done_outline", "TasksCompleted", "Bước Đi Đầu Tiên", 1 },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2532), "Hoàn thành tổng cộng 10 nhiệm vụ", "playlist_add_check", "TasksCompleted", "Chăm Chỉ Mỗi Ngày", 10 },
                    { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2534), "Hoàn thành tổng cộng 50 nhiệm vụ", "trending_up", "TasksCompleted", "Năng Suất Vượt Trội", 50 },
                    { new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2537), "Đạt chuỗi 3 ngày học liên tiếp", "bolt", "StreakDays", "Khởi Động Streak", 3 },
                    { new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2539), "Đạt chuỗi 7 ngày học liên tiếp", "verified", "StreakDays", "Kỷ Luật Sắt Đá", 7 },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2542), "Đạt chuỗi 30 ngày học liên tiếp", "workspace_premium", "StreakDays", "Chiến Binh Kỷ Luật", 30 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudyPets_UserId",
                table: "StudyPets",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserBadges_BadgeId",
                table: "UserBadges",
                column: "BadgeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudyPets");

            migrationBuilder.DropTable(
                name: "UserBadges");

            migrationBuilder.DropTable(
                name: "Badges");

            migrationBuilder.DropColumn(
                name: "Coins",
                table: "Users");
        }
    }
}
