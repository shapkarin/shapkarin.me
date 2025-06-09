const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../..', 'src', 'HTML-Gallery');
const destDir = path.join(__dirname, '../..', 'dist', 'gallery');

function copyDirectory(src, dest) {
  try {
    // Ensure destination directory exists, create if not
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
      console.log(`Created directory: ${dest}`);
    } else {
        // Clear the destination directory if it exists to ensure a clean copy
        console.log(`Clearing existing directory: ${dest}`);
        // Remove all files including .gitkeep
        const files = fs.readdirSync(dest);
        for (const file of files) {
          const fullPath = path.join(dest, file);
          if (fs.statSync(fullPath).isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(fullPath);
          }
        }
        console.log(`Cleared directory completely: ${dest}`);
    }

    // Copy the source directory to the destination directory
    fs.cpSync(src, dest, { recursive: true });

    console.log(`Successfully copied '${src}' to '${dest}'`);
  } catch (err) {
    console.error(`Error copying directory from ${src} to ${dest}:`, err);
    process.exit(1); // Exit with error code
  }
}

// Execute the copy operation
copyDirectory(sourceDir, destDir);
