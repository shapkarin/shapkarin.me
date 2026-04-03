const fs = require('fs');

let content = fs.readFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', 'utf8');

const jsdocStart = `  /**
   * Check if file has unprocessed mermaid blocks
   * Returns an object with information about processed/unprocessed blocks
   */
  analyzeFileProcessingStatus(markdownContent, filePath) {`;

const jsdocEnd = `  /**
   * Check if file has unprocessed mermaid blocks
   * @param {string} markdownContent - The content of the markdown file
   * @param {string} filePath - The path to the markdown file
   * @returns {{ totalMermaidBlocks: number, hasUnprocessedBlocks: boolean, needsProcessing: boolean }} Information about processed/unprocessed blocks
   */
  analyzeFileProcessingStatus(markdownContent, filePath) {`;

content = content.replace(jsdocStart, jsdocEnd);
fs.writeFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', content);
