using ImageMagick;

namespace SteffBeckers.Scan2PDF;

public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Starting Scan2PDF...");

        // Get the current directory
        string currentDirectory = Directory.GetCurrentDirectory();
        Console.WriteLine($"Watching directory: {currentDirectory}");

        // Process all existing files in the directory at startup
        ProcessAllFiles(currentDirectory);

        Console.WriteLine("Press any key to exit.");

        // Initialize and start the FileSystemWatcher
        FileSystemWatcher watcher = new FileSystemWatcher
        {
            Path = currentDirectory,
            NotifyFilter = NotifyFilters.FileName | NotifyFilters.LastWrite,
            EnableRaisingEvents = true
        };

        // Add event handlers for created and renamed events
        watcher.Created += (sender, eventArgs) => ProcessFile(eventArgs.FullPath);
        watcher.Deleted += (sender, eventArgs) => ProcessFile(eventArgs.FullPath);
        watcher.Renamed += (sender, eventArgs) => ProcessFile(eventArgs.FullPath);

        Console.ReadLine();
    }

    private static void ProcessAllFiles(string directory)
    {
        try
        {
            // Get all image files in the directory
            List<string> imageFiles = Directory.GetFiles(directory, "*.jpg")
                .Concat(Directory.GetFiles(directory, "*.png"))
                .ToList();

            if (!imageFiles.Any())
            {
                Console.WriteLine("No image files found to process.");
                return;
            }

            // Group files by their prefix
            IEnumerable<IGrouping<string, string>> fileGroups = imageFiles.GroupBy(file => GetPrefix(Path.GetFileNameWithoutExtension(file)));

            // Process each group
            foreach (IGrouping<string, string> group in fileGroups)
            {
                string prefix = group.Key;
                List<string> files = group.OrderBy(f => f).ToList();
                CreatePdfFromFiles(prefix, files, directory);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing files in directory: {ex.Message}");
        }
    }

    private static void ProcessFile(string filePath)
    {
        try
        {
            // Check if the file is .jpg or .png
            if (!filePath.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) &&
                !filePath.EndsWith(".png", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            string? directory = Path.GetDirectoryName(filePath);
            if (directory == null) return;

            string fileName = Path.GetFileNameWithoutExtension(filePath);
            string prefix = GetPrefix(fileName);

            if (string.IsNullOrEmpty(prefix)) return;

            // Find all related files with the same prefix
            List<string> imageFiles = Directory.GetFiles(directory, "*.jpg")
                .Concat(Directory.GetFiles(directory, "*.png"))
                .Where(f => Path.GetFileNameWithoutExtension(f).StartsWith(prefix))
                .OrderBy(f => f)
                .ToList();

            if (!imageFiles.Any()) return;

            CreatePdfFromFiles(prefix, imageFiles, directory);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing file {filePath}: {ex.Message}");
        }
    }

    private static void CreatePdfFromFiles(string prefix, List<string> files, string directory)
    {
        try
        {
            string pdfPath = Path.Combine(directory, $"{prefix}.pdf");

            using (MagickImageCollection collection = new MagickImageCollection())
            {
                foreach (string file in files)
                {
                    MagickImage image = new MagickImage(file); // Do not use "using" here
                    image.Density = new Density(150); // Set DPI
                    image.Resize(1240, 1754);         // A4 size in pixels at 150 DPI
                    image.Extent(1240, 1754);         // Force exact A4 size
                    image.Format = MagickFormat.Pdf;  // Convert to PDF format
                    collection.Add(image);
                }

                // Merge all images into a single PDF
                collection.Write(pdfPath);
            }

            Console.WriteLine($"PDF created: {pdfPath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating PDF for prefix {prefix}: {ex.Message}");
        }
    }

    private static string GetPrefix(string fileName)
    {
        // Identify the numeric portion of the prefix, stopping before a space, parenthesis, or non-alphanumeric character
        int index = 0;

        while (index < fileName.Length && (char.IsLetterOrDigit(fileName[index]) || fileName[index] == '_'))
        {
            index++;
        }

        return fileName.Substring(0, index);
    }
}