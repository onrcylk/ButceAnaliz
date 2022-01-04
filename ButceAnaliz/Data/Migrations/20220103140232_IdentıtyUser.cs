using Microsoft.EntityFrameworkCore.Migrations;

namespace ButceAnaliz.Data.Migrations
{
    public partial class IdentıtyUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Gelir",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Gelir_UserId",
                table: "Gelir",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Gelir_AspNetUsers_UserId",
                table: "Gelir",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gelir_AspNetUsers_UserId",
                table: "Gelir");

            migrationBuilder.DropIndex(
                name: "IX_Gelir_UserId",
                table: "Gelir");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Gelir");
        }
    }
}
