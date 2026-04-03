const fs = require('fs');

let content = fs.readFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', 'utf8');

const oldMain = `// CLI usage
async function main() {
  const args = process.argv.slice(2);
  const preset = args.find(arg => arg.startsWith('--preset='))?.split('=')[1] || 'default'; // 'default' can be removed or replaced with preset name
  const verbose = args.includes('--verbose') || args.includes('-v');

  // Get configuration from external config file
  const config = getConfig(preset);`;

const newMain = `// CLI usage
async function main() {
  const args = process.argv.slice(2);
  const configPathArg = args.find(arg => arg.startsWith('--config='));
  const configPath = configPathArg ? configPathArg.split('=')[1] : null;
  const verbose = args.includes('--verbose') || args.includes('-v');

  let userConfig = {};
  try {
    const configModulePath = configPath ? path.resolve(process.cwd(), configPath) : path.resolve(process.cwd(), 'mermaid.config.mjs');
    const { default: loadedConfig } = await import(configModulePath);
    userConfig = loadedConfig;
  } catch (err) {
    if (configPath) {
      console.warn(\`⚠️  Could not load config from \${configPath}, using default config.\`);
    }
  }

  // Get configuration from external config file
  const baseConfig = getConfig();
  const config = { ...baseConfig, ...userConfig };`;

content = content.replace(oldMain, newMain);
fs.writeFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', content);
