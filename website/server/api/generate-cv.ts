import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the desired URL
    let url = "http://localhost:3000/cv";
    console.log(`Navigating to ${url}...`);
    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    // Define the PDF output path
    let pdfPath = "public/downloads/CV_Steff_Beckers.pdf";

    // Save the page as a PDF
    console.log(`Saving page as PDF: ${pdfPath}`);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true, // Include background graphics
    });

    console.log(`PDF saved successfully to ${pdfPath}`);

    pdfPath = "public/downloads/CV_Steff_Beckers_EN.pdf";

    console.log(`Saving page as PDF: ${pdfPath}`);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true, // Include background graphics
    });

    console.log(`PDF saved successfully to ${pdfPath}`);

    url = "http://localhost:3000/nl/cv";
    console.log(`Navigating to ${url}...`);
    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    // Define the PDF output path
    pdfPath = "public/downloads/CV_Steff_Beckers_NL.pdf";

    // Save the page as a PDF
    console.log(`Saving page as PDF: ${pdfPath}`);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true, // Include background graphics
    });

    console.log(`PDF saved successfully to ${pdfPath}`);

    // Close the browser
    await browser.close();

    // Return the PDF path
    await sendRedirect(event, "/downloads/CV_Steff_Beckers.pdf");
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
