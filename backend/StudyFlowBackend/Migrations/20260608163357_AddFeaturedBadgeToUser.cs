using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyFlowBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddFeaturedBadgeToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "FeaturedBadgeId",
                table: "Users",
                type: "uuid",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1780));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1793));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1796));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1799));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555555"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1802));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666666"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1804));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1806));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1814));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1816));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1818));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1820));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1822));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1824));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 33, 57, 289, DateTimeKind.Utc).AddTicks(1827));

            migrationBuilder.CreateIndex(
                name: "IX_Users_FeaturedBadgeId",
                table: "Users",
                column: "FeaturedBadgeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Badges_FeaturedBadgeId",
                table: "Users",
                column: "FeaturedBadgeId",
                principalTable: "Badges",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Badges_FeaturedBadgeId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_FeaturedBadgeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FeaturedBadgeId",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2491));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2505));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2508));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2510));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555555"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2512));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666666"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2514));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2518));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2521));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2525));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2532));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2534));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2537));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2539));

            migrationBuilder.UpdateData(
                table: "Badges",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                column: "CreatedAt",
                value: new DateTime(2026, 6, 8, 16, 13, 33, 203, DateTimeKind.Utc).AddTicks(2542));
        }
    }
}
