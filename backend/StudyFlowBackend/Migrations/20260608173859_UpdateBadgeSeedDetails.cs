using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyFlowBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBadgeSeedDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Reach Level 5", "Noob No More" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Reach Level 10", "Touching Grass? Never" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Reach Level 20", "Certified Brainrot" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Reach Level 50", "Main Character Energy" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555555"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Accumulate 1 hour of focus time", "Locked In" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666666"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Accumulate 10 hours of focus time", "Distraction Who?" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Accumulate 50 hours of focus time", "Sigma Study Grind" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Accumulate 100 hours of focus time", "Ultra Instinct" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Complete your first task", "The First W" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Complete 10 tasks", "Task Destroyer" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Complete 50 tasks", "Productivity Monster" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Maintain a 3-day streak", "Day One or One Day?" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Maintain a 7-day streak", "Built Different" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Maintain a 30-day streak", "Grassless Legend" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Đạt cấp độ 5", "Tân Binh Tập Sự" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Đạt cấp độ 10", "Học Giả Nghiêm Túc" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Đạt cấp độ 20", "Bậc Thầy Trí Tuệ" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Đạt cấp độ 50", "Học Giả Vĩ Đại" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555555"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Tập trung học tập tổng cộng 1 giờ (60 phút)", "Khởi Đầu Tập Trung" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666666"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Tập trung học tập tổng cộng 10 giờ (600 phút)", "Chiến Binh Tập Trung" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Tập trung học tập tổng cộng 50 giờ (3000 phút)", "Thiền Sư Học Tập" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Tập trung học tập tổng cộng 100 giờ (6000 phút)", "Bậc Thầy Tập Trung" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Hoàn thành 1 nhiệm vụ đầu tiên", "Bước Đi Đầu Tiên" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Hoàn thành tổng cộng 10 nhiệm vụ", "Chăm Chỉ Mỗi Ngày" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Hoàn thành tổng cộng 50 nhiệm vụ", "Năng Suất Vượt Trội" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Đạt chuỗi 3 ngày học liên tiếp", "Khởi Động Streak" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Đạt chuỗi 7 ngày học liên tiếp", "Kỷ Luật Sắt Đá" });

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                columns: new[] { "Description", "Name" },
                values: new object[] { "Đạt chuỗi 30 ngày học liên tiếp", "Chiến Binh Kỷ Luật" });
        }
    }
}
