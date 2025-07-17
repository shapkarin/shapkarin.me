const fs = require('fs');
const path = require('path');

// Configuration constants
const CONFIG = {
  ARTICLES_PATH: path.join(__dirname, '../../public/api/articles'),
  OUTPUT_FILENAME: 'articles.json',
  FILE_EXTENSION: '.md'
};

// Extracts frontmatter from markdown content
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  return match[1].split('\n')
    .reduce((frontmatter, line) => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let value = parts.slice(1).join(':').trim().replace(/^"(.*)"$/, '$1');
        
        // We no longer need to process the 'order' field since we're using file dates
        frontmatter[key] = value;
      }
      return frontmatter;
    }, {});
}

// Reads all markdown files from the articles directory
function getArticleFiles() {
  try {
    return fs.readdirSync(CONFIG.ARTICLES_PATH)
      .filter(file => file.endsWith(CONFIG.FILE_EXTENSION));
  } catch (error) {
    throw new Error(`Failed to read articles directory: ${error.message}`);
  }
}

// Extracts article data from a markdown file
function processArticleFile(filename) {
  try {
    const filePath = path.join(CONFIG.ARTICLES_PATH, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = extractFrontmatter(content);
    
    // Get file creation date (birthtime) - newer files will have later dates
    const stats = fs.statSync(filePath);
    const creationDate = stats.birthtime;
    
    // Remove NUMBER- prefix from slug if it exists and file extension
    const slug = filename.replace(new RegExp(`^\\d+-|${CONFIG.FILE_EXTENSION}$`, 'g'), '');
    
    return {
      slug,
      title: formatTitle(slug),
      creationDate: creationDate,
      filename,
    };
  } catch (error) {
    console.error(`Error processing file ${filename}: ${error.message}`);
    // Return a valid object with default values to prevent breaking the process
    return {
      slug: filename.replace(CONFIG.FILE_EXTENSION, ''),
      title: filename.replace(CONFIG.FILE_EXTENSION, ''),
      creationDate: new Date(0), // Fallback to epoch date
      filename,
    };
  }
}

// Formats a slug into a title
function formatTitle(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, match => match.toUpperCase());
}

// Sorts articles by creation date (newer first) and then alphabetically
function sortArticles(articles) {
  return [...articles].sort((a, b) => {
    // First sort by creation date (newer files first)
    const dateComparison = b.creationDate.getTime() - a.creationDate.getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }
    // Then sort alphabetically by slug if dates are the same
    return a.slug.localeCompare(b.slug);
  });
}

// Removes internal properties from articles before output
function prepareForOutput(articles) {
  return articles.map(({ creationDate, ...rest }) => rest);
}

// Writes the articles list to a JSON file
function writeArticlesJson(articles) {
  try {
    const outputPath = path.join(CONFIG.ARTICLES_PATH, CONFIG.OUTPUT_FILENAME);
    const jsonContent = JSON.stringify(articles, null, 2);
    fs.writeFileSync(outputPath, jsonContent);
    console.log(`Generated articles list with ${articles.length} articles at ${outputPath}`);
    console.log('Articles sorted by file creation date (newest first)');
  } catch (error) {
    throw new Error(`Failed to write articles JSON: ${error.message}`);
  }
}

// Main function to generate the articles list
function generateArticlesList() {
  try {
    const files = getArticleFiles();
    const articles = files.map(processArticleFile);
    const sortedArticles = sortArticles(articles);
    const cleanedArticles = prepareForOutput(sortedArticles);
    writeArticlesJson(cleanedArticles);
  } catch (error) {
    console.error('Error generating articles list:', error);
    process.exit(1);
  }
}

// Run the generator