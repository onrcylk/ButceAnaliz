using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ButceAnaliz.Data.Migrations
{
    public partial class AddDashboardProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "KayitTarihi",
                table: "Dashboards",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ToplamTutar",
                table: "Dashboards",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Dashboards",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dashboards_UserId",
                table: "Dashboards",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dashboards_AspNetUsers_UserId",
                table: "Dashboards",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dashboards_AspNetUsers_UserId",
                table: "Dashboards");

            migrationBuilder.DropIndex(
                name: "IX_Dashboards_UserId",
                table: "Dashboards");

            migrationBuilder.DropColumn(
                name: "KayitTarihi",
                table: "Dashboards");

            migrationBuilder.DropColumn(
                name: "ToplamTutar",
                table: "Dashboards");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Dashboards");
        }
    }
}
