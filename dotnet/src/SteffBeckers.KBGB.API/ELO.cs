using HtmlAgilityPack;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SteffBeckers.KBGB.API
{
    public static class ELO
    {
        private static readonly HttpClient HttpClient = new HttpClient();

        [FunctionName("elo")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Scraping the KBGB table...");

            try
            {
                // Fetch the HTML content from the target URL
                string url = "https://kaartenbeheer.kbgb.be/kbgbelo.php";
                HttpResponseMessage response = await HttpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                string html = await response.Content.ReadAsStringAsync();

                // Parse the HTML content using HtmlAgilityPack
                HtmlDocument htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(html);

                // Locate the table in the HTML
                HtmlNode table = htmlDoc.DocumentNode.SelectSingleNode("//table");
                if (table == null)
                {
                    log.LogError("No table found on the page.");
                    return new NotFoundObjectResult("Table not found on the page.");
                }

                // Extract table rows
                HtmlNodeCollection rows = table.SelectNodes(".//tr");
                if (rows == null || rows.Count == 0)
                {
                    log.LogError("No rows found in the table.");
                    return new NotFoundObjectResult("No rows found in the table.");
                }

                // Process rows into a structured format
                var data = rows.Skip(1) // Skip the header row
                    .Select(row =>
                    {
                        string[] cells = row.SelectNodes(".//td").Select(cell => cell.InnerText.Trim()).ToArray();

                        return new
                        {
                            Rank = int.Parse(cells.ElementAtOrDefault(0)),
                            MembershipNumber = int.Parse(cells.ElementAtOrDefault(1)),
                            LastName = cells.ElementAtOrDefault(2),
                            FirstName = cells.ElementAtOrDefault(3),
                            LetterValue = cells.ElementAtOrDefault(4),
                            ELO = int.Parse(cells.ElementAtOrDefault(5))
                        };
                    })
                    .ToList();

                // Return the data as JSON
                return new OkObjectResult(data);
            }
            catch (Exception ex)
            {
                log.LogError(ex, "An error occurred while scraping the KBGB table.");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}