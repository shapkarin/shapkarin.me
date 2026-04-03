const fs = require('fs');

let content = fs.readFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', 'utf8');

const oldStr = `      let totalDiagrams = 0;

      // Process each file
      for (const file of markdownFiles) {
        const diagramCount = await this.processMarkdownFile(file);
        totalDiagrams += diagramCount;
      }`;

const newStr = `      let totalDiagrams = 0;

      // Process files concurrently
      const concurrentLimit = this.config.concurrent || 2;
      for (let i = 0; i < markdownFiles.length; i += concurrentLimit) {
        const batch = markdownFiles.slice(i, i + concurrentLimit);
        const results = await Promise.all(batch.map(file => this.processMarkdownFile(file)));
        totalDiagrams += results.reduce((sum, count) => sum + count, 0);
      }`;

content = content.replace(oldStr, newStr);
fs.writeFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', content);
