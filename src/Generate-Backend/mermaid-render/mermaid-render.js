const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');
const crypto = require('crypto');
const mermaidConfig = require('./mermaid.config.js');

/**
 * Simple Mermaid SVG Generator
 * Processes markdown files and converts mermaid diagrams to SVG images
 */
class MermaidProcessor {
  constructor(config = {}) {
    this.config = {
      ...config
    };
    
    this.stats = {
      filesProcessed: 0,
      diagramsGenerated: 0,
      errors: 0
    };
  }

  /**
   * Generate SVG from Mermaid code using stdin
   */
  async generateSVG(mermaidCode, outputPath, theme = 'dark') {
    try {
      // Ensure output directory exists
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      
      // Use mermaid CLI with stdin input (no temp files)
      const command = `echo "${mermaidCode.replace(/"/g, '\\"')}" | npx mmdc -i /dev/stdin -o "${outputPath}" -t ${theme} -b transparent`;
      
      if (this.config.verbose) {
        console.log(`🎨 Generating: ${path.basename(outputPath)} (${theme})`);
      }
      
      execSync(command, { 
        stdio: this.config.verbose ? 'inherit' : 'pipe',
        cwd: process.cwd()
      });
      
      // Verify SVG was created
      const content = await fs.readFile(outputPath, 'utf8');
      if (!content.includes('<svg')) {
        throw new Error('Generated SVG is invalid');
      }
      
      this.stats.diagramsGenerated++;
      if (this.config.verbose) {
        console.log(`✅ Generated: ${path.basename(outputPath)}`);
      }
      
      return outputPath;
      
    } catch (error) {
      this.stats.errors++;
      console.error(`❌ Failed to generate ${path.basename(outputPath)}: ${error.message}`);
      return null;
    }
  }

  /**
   * Generate unique diagram ID from content
   */
  generateDiagramId(mermaidCode) {
    return crypto
      .createHash('md5')
      .update(mermaidCode.trim())
      .digest('hex')
      .substring(0, 8);
  }

  /**
   * Generate descriptive alt text from mermaid code
   */
  generateAltText(mermaidCode) {
    const firstLine = mermaidCode.trim().split('\n')[0];
    const typeMatch = firstLine.match(/^(graph|flowchart|sequenceDiagram|classDiagram|pie|journey|gantt|stateDiagram|erDiagram)/);
    const type = typeMatch ? typeMatch[1] : 'diagram';
    
    const titleMatch = mermaidCode.match(/title[:\s]+([^\n]+)/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    if (title) {
      return `${type.charAt(0).toUpperCase() + type.slice(1)}: ${title}`;
    }
    
    return `${type.charAt(0).toUpperCase() + type.slice(1)} diagram`;
  }

  /**
   * Check if file has already been processed by looking for SVG image references
   */
  isFileAlreadyProcessed(markdownContent, filePath) {
    const baseFilename = path.basename(filePath, '.md');
    
    // Look for patterns like ![altText](*/baseFilename-N.svg)
    const svgImageRegex = new RegExp(`!\\[[^\\]]*\\]\\([^)]*${baseFilename}-\\d+\\.svg[^)]*\\)`, 'g');
    const svgMatches = markdownContent.match(svgImageRegex);
    
    if (svgMatches && svgMatches.length > 0) {
      if (this.config.verbose) {
        console.log(`⏭️  File already processed: ${path.basename(filePath)} (found ${svgMatches.length} SVG references)`);
      }
      return true;
    }
    
    return false;
  }

  /**
   * Process a single markdown file
   */
  async processMarkdownFile(filePath) {
    try {
      if (this.config.verbose) {
        console.log(`📄 Processing: ${path.basename(filePath)}`);
      }
      
      const content = await fs.readFile(filePath, 'utf8');
      const { data: frontMatter, content: markdownContent } = matter(content);
      
      // Check if file has already been processed
      if (this.isFileAlreadyProcessed(markdownContent, filePath)) {
        return 0; // Skip processing
      }
      
      // Find all mermaid blocks
      const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
      const matches = [...markdownContent.matchAll(mermaidRegex)];
      
      if (matches.length === 0) {
        if (this.config.verbose) {
          console.log(`⏭️  No mermaid diagrams found in ${path.basename(filePath)}`);
        }
        return 0;
      }
      
      let processedContent = markdownContent;
      const baseFilename = path.basename(filePath, '.md');
      
      // Process each mermaid diagram
      for (let i = 0; i < matches.length; i++) {
        const [fullMatch, mermaidCode] = matches[i];
        const filename = `${baseFilename}-${i}`;
        
        if (this.config.verbose) {
          console.log(`🎯 Processing diagram ${i + 1}/${matches.length}: ${filename}`);
        }
        
        let imageUrl;
        
        if (this.config.generateBothThemes) {
          // Generate both themes
          const lightPath = path.join(this.config.outputDir, 'light', `${filename}.svg`);
          const darkPath = path.join(this.config.outputDir, 'dark', `${filename}.svg`);
          
          const [lightResult, darkResult] = await Promise.all([
            this.generateSVG(mermaidCode, lightPath, 'default'),  // Use 'default' instead of 'light'
            this.generateSVG(mermaidCode, darkPath, 'dark')
          ]);
          
          if (!lightResult || !darkResult) {
            console.error(`❌ Failed to generate both themes for ${filename}`);
            continue;
          }
          
          // Use dark theme as default for now
          imageUrl = `${this.config.baseUrl}/dark/${filename}.svg`;
        } else {
          // Generate single theme
          const outputPath = path.join(this.config.outputDir, `${filename}.svg`);
          const result = await this.generateSVG(mermaidCode, outputPath, this.config.defaultTheme);
          
          if (!result) {
            console.error(`❌ Failed to generate ${filename}`);
            continue;
          }
          
          imageUrl = `${this.config.baseUrl}/${filename}.svg`;
        }
        
        // Create replacement markdown
        const altText = this.generateAltText(mermaidCode);
        let replacement = `![${altText}](${imageUrl})`;
        
        // Add source code if requested
        if (this.config.includeSourceCode && this.config.sourceCodeStyle !== 'none') {
          if (this.config.sourceCodeStyle === 'inline') {
            replacement += `\n\`\`\`mermaid\n${mermaidCode.trim()}\n\`\`\``;
          }
        }
        
        // Replace in content
        processedContent = processedContent.replace(fullMatch, replacement);
      }
      
      // Write back if changed
      if (processedContent !== markdownContent) {
        const processedFile = matter.stringify(processedContent, frontMatter);
        await fs.writeFile(filePath, processedFile);
        this.stats.filesProcessed++;
        
        if (this.config.verbose) {
          console.log(`✅ Updated: ${path.basename(filePath)} (${matches.length} diagrams)`);
        }
      }
      
      return matches.length;
      
    } catch (error) {
      this.stats.errors++;
      console.error(`❌ Failed to process ${filePath}: ${error.message}`);
      return 0;
    }
  }

  /**
   * Find all markdown files
   */
  async findMarkdownFiles() {
    const files = [];
    
    const scanDirectory = async (dir) => {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            await scanDirectory(fullPath);
          } else if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        console.error(`❌ Error scanning directory ${dir}: ${error.message}`);
      }
    };
    
    await scanDirectory(this.config.inputDir);
    return files;
  }

  /**
   * Process all markdown files
   */
  async processAllMarkdownFiles() {
    const startTime = Date.now();
    
    console.log(`🚀 Starting Mermaid processor`);
    console.log(`📂 Input: ${this.config.inputDir}`);
    console.log(`📂 Output: ${this.config.outputDir}`);
    console.log(`🎨 Theme: ${this.config.defaultTheme}${this.config.generateBothThemes ? ' (both themes)' : ''}`);
    
    const markdownFiles = await this.findMarkdownFiles();
    
    if (markdownFiles.length === 0) {
      console.log('⚠️  No markdown files found');
      return;
    }
    
    console.log(`📚 Found ${markdownFiles.length} markdown files:`);
    markdownFiles.forEach(file => {
      console.log(`  - ${path.relative(process.cwd(), file)}`);
    });
    
    let totalDiagrams = 0;
    
    // Process each file
    for (const file of markdownFiles) {
      const diagramCount = await this.processMarkdownFile(file);
      totalDiagrams += diagramCount;
    }
    
    // Print summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n🎉 Processing Complete!');
    console.log('═'.repeat(50));
    console.log(`📁 Files processed: ${this.stats.filesProcessed}`);
    console.log(`🎨 Diagrams generated: ${this.stats.diagramsGenerated}`);
    console.log(`📊 Total diagrams found: ${totalDiagrams}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📂 Output directory: ${this.config.outputDir}`);
    console.log('═'.repeat(50));
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2);
  const preset = args.find(arg => arg.startsWith('--preset='))?.split('=')[1] || 'shapkarin';
  const verbose = args.includes('--verbose') || args.includes('-v');
  
  // Get configuration from external config file
  const config = mermaidConfig.getConfig(preset);
  
  // Override with CLI flags
  if (verbose !== undefined) {
    config.verbose = verbose;
  }
  
  try {
    const processor = new MermaidProcessor(config);
    await processor.processAllMarkdownFiles();
    process.exit(0);
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    if (config.verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { MermaidProcessor, config: mermaidConfig };
