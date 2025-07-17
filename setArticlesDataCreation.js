const fs = require('fs');
const path = require('path');

// Function to format date as "17 July 2025"
function formatDate(date) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

// Function to update markdown file metadata
function updateMarkdownMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Get file creation date
    const stats = fs.statSync(filePath);
    const creationDate = formatDate(stats.birthtime);
    
    // Check if file has frontmatter
    if (!content.startsWith('---')) {
      console.log(`Skipping ${filePath}: No frontmatter found`);
      return;
    }
    
    // Find the end of frontmatter
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd === -1) {
      console.log(`Skipping ${filePath}: Invalid frontmatter format`);
      return;
    }
    
    // Extract frontmatter
    const frontmatter = content.substring(3, frontmatterEnd);
    const restOfContent = content.substring(frontmatterEnd + 3);
    
    // Parse existing frontmatter
    const lines = frontmatter.split('\n');
    const newLines = [];
    let hasDate = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) {
        newLines.push(line);
        continue;
      }
      
      // Skip order field
      if (trimmedLine.startsWith('order:')) {
        console.log(`Removing order field from ${path.basename(filePath)}`);
        continue;
      }
      
      // Check if date already exists
      if (trimmedLine.startsWith('date:')) {
        hasDate = true;
        console.log(`Date already exists in ${path.basename(filePath)}`);
      }
      
      newLines.push(line);
    }
    
    // Add date if it doesn't exist
    if (!hasDate) {
      newLines.push(`date: "${creationDate}"`);
      console.log(`Added date: ${creationDate} to ${path.basename(filePath)}`);
    }
    
    // Reconstruct the file content
    const newFrontmatter = newLines.join('\n');
    const newContent = `---\n${newFrontmatter}\n---${restOfContent}`;
    
    // Write back to file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Main function
function main() {
  const articlesDir = path.join(__dirname, 'public', 'api', 'articles');
  const articlesJsonPath = path.join(articlesDir, 'articles.json');
  
  try {
    // Read articles.json
    const articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));
    
    console.log(`Found ${articlesData.length} articles to process\n`);
    
    // Process each article
    articlesData.forEach(article => {
      const filePath = path.join(articlesDir, article.filename);
      
      if (fs.existsSync(filePath)) {
        updateMarkdownMetadata(filePath);
      } else {
        console.log(`File not found: ${article.filename}`);
      }
    });
    
    console.log('\nProcessing complete!');
    
  } catch (error) {
    console.error('Error reading articles.json:', error.message);
  }
}

// Run the script
main(); 