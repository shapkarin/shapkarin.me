const fs = require('fs').promises;
const path = require('path');
const fsSync = require('fs');

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
        const value = parts.slice(1).join(':').trim().replace(/^"(.*)"$/, '$1');
        frontmatter[key] = value;
      }
      return frontmatter;
    }, {});
}

// Reads all markdown files from the articles directory
async function getArticleFiles() {
  try {
    const files = await fs.readdir(CONFIG.ARTICLES_PATH);
    return files.filter(file => file.endsWith(CONFIG.FILE_EXTENSION));
  } catch (error) {
    throw new Error(`Failed to read articles directory: ${error.message}`);
  }
}

// Extracts article data from a markdown file
async function processArticleFile(filename) {
  try {
    const filePath = path.join(CONFIG.ARTICLES_PATH, filename);
    const content = await fs.readFile(filePath, 'utf8');
    const frontmatter = extractFrontmatter(content);
    
    // Extract number from the beginning of the filename
    const filenameNumber = parseInt(filename.match(/^(\d+)/)?.[1]) || 0;
    
    // Remove NUMBER- prefix from slug if it exists and file extension
    const slug = filename.replace(new RegExp(`^\\d+-|${CONFIG.FILE_EXTENSION}$`, 'g'), '');
    
    return {
      slug,
      title: formatTitle(slug),
      sortOrder: filenameNumber
    };
  } catch (error) {
    console.error(`Error processing file ${filename}: ${error.message}`);
    // Return a valid object with default values to prevent breaking the process
    return {
      slug: filename.replace(CONFIG.FILE_EXTENSION, ''),
      title: filename.replace(CONFIG.FILE_EXTENSION, ''),
      sortOrder: 0
    };
  }
}

// Formats a slug into a title
function formatTitle(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, match => match.toUpperCase());
}

// Sorts articles by sortOrder and then alphabetically
function sortArticles(articles) {
  return [...articles].sort((a, b) => {
    // First sort by sortOrder
    if (a.sortOrder !== b.sortOrder) {
      return b.sortOrder - a.sortOrder;
    }
    // Then sort alphabetically by slug
    return b.slug.localeCompare(a.slug);
  });
}

// Removes internal properties from articles before output
function prepareForOutput(articles) {
  return articles.map(({ sortOrder, ...rest }) => rest);
}

// Writes the articles list to a JSON file
async function writeArticlesJson(articles) {
  try {
    const outputPath = path.join(CONFIG.ARTICLES_PATH, CONFIG.OUTPUT_FILENAME);
    const jsonContent = JSON.stringify(articles, null, 2);
    await fs.writeFile(outputPath, jsonContent);
    console.log(`Generated articles list with ${articles.length} articles at ${outputPath}`);
  } catch (error) {
    throw new Error(`Failed to write articles JSON: ${error.message}`);
  }
}

// Main function to generate the articles list
async function generateArticlesList() {
  try {
    const files = await getArticleFiles();
    
    // Process all files concurrently
    const articlesPromises = files.map(processArticleFile);
    const articles = await Promise.all(articlesPromises);
    
    const sortedArticles = sortArticles(articles);
    const cleanedArticles = prepareForOutput(sortedArticles);
    await writeArticlesJson(cleanedArticles);
  } catch (error) {
    console.error('Error generating articles list:', error);
    process.exit(1);
  }
}

// Run the generator
(async () => {
  await generateArticlesList();
})(); 