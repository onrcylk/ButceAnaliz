using Microsoft.EntityFrameworkCore.Migrations;

namespace ButceAnaliz.Data.Migrations
{
    public partial class addforeignkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dashboards_Kullanıcı_KullanıcıId",
                table: "Dashboards");

            migrationBuilder.DropForeignKey(
                name: "FK_Gelir_Kullanıcı_KullanıcıId",
                table: "Gelir");

            migrationBuilder.DropForeignKey(
                name: "FK_Gider_Kullanıcı_KullanıcıId",
                table: "Gider");

            migrationBuilder.DropTable(
                name: "Kullanıcı");

            migrationBuilder.DropIndex(
                name: "IX_Gider_KullanıcıId",
                table: "Gider");

            migrationBuilder.DropIndex(
                name: "IX_Gelir_KullanıcıId",
                table: "Gelir");

            migrationBuilder.DropIndex(
                name: "IX_Dashboards_KullanıcıId",
                table: "Dashboards");

            migrationBuilder.DropColumn(
                name: "KullanıcıId",
                table: "Gider");

            migrationBuilder.DropColumn(
                name: "KullanıcıId",
                table: "Gelir");

            migrationBuilder.DropColumn(
                name: "KullanıcıId",
                table: "Dashboards");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Yatırım",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Gider",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Yatırım_UserId",
                table: "Yatırım",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Gider_UserId",
                table: "Gider",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Gider_AspNetUsers_UserId",
                table: "Gider",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Yatırım_AspNetUsers_UserId",
                table: "Yatırım",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gider_AspNetUsers_UserId",
                table: "Gider");

            migrationBuilder.DropForeignKey(
                name: "FK_Yatırım_AspNetUsers_UserId",
                table: "Yatırım");

            migrationBuilder.DropIndex(
                name: "IX_Yatırım_UserId",
                table: "Yatırım");

            migrationBuilder.DropIndex(
                name: "IX_Gider_UserId",
                table: "Gider");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Yatırım");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Gider");

            migrationBuilder.AddColumn<int>(
                name: "KullanıcıId",
                table: "Gider",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "KullanıcıId",
                table: "Gelir",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "KullanıcıId",
                table: "Dashboards",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Kullanıcı",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KullanıcıAd = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KullanıcıSoyad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Parola = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kullanıcı", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Gider_KullanıcıId",
                table: "Gider",
                column: "KullanıcıId");

            migrationBuilder.CreateIndex(
                name: "IX_Gelir_KullanıcıId",
                table: "Gelir",
                column: "KullanıcıId");

            migrationBuilder.CreateIndex(
                name: "IX_Dashboards_KullanıcıId",
                table: "Dashboards",
                column: "KullanıcıId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dashboards_Kullanıcı_KullanıcıId",
                table: "Dashboards",
                column: "KullanıcıId",
                principalTable: "Kullanıcı",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Gelir_Kullanıcı_KullanıcıId",
                table: "Gelir",
                column: "KullanıcıId",
                principalTable: "Kullanıcı",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Gider_Kullanıcı_KullanıcıId",
                table: "Gider",
                column: "KullanıcıId",
                principalTable: "Kullanıcı",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
