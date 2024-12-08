const fs = require('fs');
const path = require('path');

// Path to articles directory
const articlesDir = path.join(__dirname, '../../public/articles');

// Function to generate articles list
function generateArticlesList() {
  try {
    // Read directory and filter for .md files
    const files = fs.readdirSync(articlesDir)
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        slug: file.replace('.md', ''),
        title: file.replace('.md', '').replace(/-/g, ' '), // Convert filename to readable title
        path: path.join(__dirname, '../../public/articles', file)
      }));

    // Convert to JSON string with pretty formatting
    const jsonContent = JSON.stringify(files, null, 2);

    // Write to articles.json in the public folder
    fs.writeFileSync(
      path.join(__dirname, '../../public/articles/list.json'), 
      jsonContent
    );

    console.log(`Generated articles list with ${files.length} articles`);
  } catch (error) {
    console.error('Error generating articles list:', error);
    process.exit(1);
  }
}

generateArticlesList(); 