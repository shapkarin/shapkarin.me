const fs = require('fs');

let content = fs.readFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', 'utf8');

const oldStr = `    this.db = null;
    this.dbPath = path.join(import.meta.dirname, this.config.dbPath);`;

const newStr = `    this.db = null;
    this.dbPath = this.config.dbPath ? path.join(import.meta.dirname, this.config.dbPath) : ':memory:';`;

content = content.replace(oldStr, newStr);
fs.writeFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', content);
