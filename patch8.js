const fs = require('fs');

let content = fs.readFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', 'utf8');

const mainEndStr = `  let processor;

  try {
    processor = new MermaidProcessor(config);
    await processor.processAllMarkdownFiles();
    process.exit(0);
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    if (config.verbose) {
      console.error(error.stack);
    }

    // Ensure database is closed even on error
    if (processor) {
      try {
        await processor.closeDatabase();
      } catch (dbError) {
        console.error('Error closing database:', dbError.message);
      }
    }

    process.exit(1);
  }`;

const newMainEndStr = `  let processor;

  const cleanup = async () => {
    if (processor) {
      try {
        await processor.closeDatabase();
      } catch (dbError) {
        console.error('Error closing database:', dbError.message);
      }
    }
  };

  process.on('SIGINT', async () => {
    console.log('\\nCaught interrupt signal. Cleaning up...');
    await cleanup();
    process.exit(0);
  });

  try {
    processor = new MermaidProcessor(config);
    await processor.processAllMarkdownFiles();
    await cleanup();
    process.exit(0);
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    if (config.verbose) {
      console.error(error.stack);
    }
    await cleanup();
    process.exit(1);
  }`;

content = content.replace(mainEndStr, newMainEndStr);
fs.writeFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', content);
