using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SteffBeckers.Migrations
{
    /// <inheritdoc />
    public partial class CRMCompanyEmailPhoneNumberAndWebsiteAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "CRMCompanies",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "CRMCompanies",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "CRMCompanies",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "CRMCompanies");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "CRMCompanies");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "CRMCompanies");
        }
    }
}
