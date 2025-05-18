const fs = require('fs');
const path = require('path');

// Path to articles directory
const ARTICLES_PATH = path.join(__dirname, '../../public/api/articles');

// Function to extract frontmatter from markdown content
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  lines.forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join(':').trim().replace(/^"(.*)"$/, '$1');
      frontmatter[key] = value;
    }
  });
  
  return frontmatter;
}

// Function to generate articles list
function generateArticlesList() {
  try {
    // Read directory and filter for .md files
    const files = fs.readdirSync(ARTICLES_PATH)
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(ARTICLES_PATH, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const frontmatter = extractFrontmatter(content);
        
        return {
          slug: file.replace('.md', ''),
          title: file.replace('.md', '')
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, match => match.toUpperCase()),
          order: frontmatter.order ? parseInt(frontmatter.order, 10) : Number.MAX_SAFE_INTEGER,
        };
      });

    // Sort files based on order (or alphabetically if no order)
    files.sort((a, b) => {
      if (a.order !== Number.MAX_SAFE_INTEGER && b.order !== Number.MAX_SAFE_INTEGER) {
        return a.order - b.order;
      } else if (a.order !== Number.MAX_SAFE_INTEGER) {
        return -1;
      } else if (b.order !== Number.MAX_SAFE_INTEGER) {
        return 1;
      } else {
        return a.slug.localeCompare(b.slug);
      }
    });

    // Remove the order property before saving to JSON
    const cleanedFiles = files.map(({ order, ...rest }) => rest);

    // Convert to JSON string with pretty formatting
    const jsonContent = JSON.stringify(cleanedFiles, null, 2);

    // Write to articles.json in the public folder
    fs.writeFileSync(
      path.join(ARTICLES_PATH, 'list.json'), 
      jsonContent
    );

    console.log(`Generated articles list with ${files.length} articles`);
  } catch (error) {
    console.error('Error generating articles list:', error);
    process.exit(1);
  }
}

generateArticlesList(); 