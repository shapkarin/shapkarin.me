const fs = require('fs');

let content = fs.readFileSync('./src/Generate-Backend/mermaid-render/mermaid.config.mjs', 'utf8');

const oldStr1 = `  // === INPUT CONFIGURATION ===
  // Directory containing your markdown files
  inputDir: './public/api/articles',

  // === OUTPUT CONFIGURATION ===
  // Where to save generated SVG files
  outputDir: './public/api/articles',

  // Base URL for images in markdown (how they'll appear in ![alt](url))
  baseUrl: '/api/articles',

  // Database path
  dbPath: '../data/mermaid-hashes.db',`;

const newStr1 = `  // === INPUT CONFIGURATION ===
  // Directory containing your markdown files
  inputDir: './docs',

  // === OUTPUT CONFIGURATION ===
  // Where to save generated SVG files
  outputDir: './docs',

  // Base URL for images in markdown (how they'll appear in ![alt](url))
  baseUrl: '/docs',

  // Database path
  dbPath: './mermaid-hashes.db',`;

content = content.replace(oldStr1, newStr1);
fs.writeFileSync('./src/Generate-Backend/mermaid-render/mermaid.config.mjs', content);
