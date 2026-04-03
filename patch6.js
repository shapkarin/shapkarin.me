const fs = require('fs');

let content = fs.readFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', 'utf8');

const classStart = `class MermaidProcessor {
  constructor(config = {}) {
    this.config = {
      ...config
    };

    this.stats = {
      filesProcessed: 0,
      diagramsGenerated: 0,
      diagramsSkipped: 0,
      errors: 0
    };

    this.db = null;
    this.dbPath = this.config.dbPath ? path.join(import.meta.dirname, this.config.dbPath) : ':memory:';
  }`;

const classEnd = `class MermaidProcessor {
  #db;
  #dbPath;

  constructor(config = {}) {
    this.config = {
      ...config
    };

    this.stats = {
      filesProcessed: 0,
      diagramsGenerated: 0,
      diagramsSkipped: 0,
      errors: 0
    };

    this.#db = null;
    this.#dbPath = this.config.dbPath ? path.join(import.meta.dirname, this.config.dbPath) : ':memory:';
  }`;

content = content.replace(classStart, classEnd)
               .replace(/this\.db/g, 'this.#db')
               .replace(/this\.dbPath/g, 'this.#dbPath');

// Revert accidental change if any for this.#dbPath
content = content.replace('this.#dbPath = this.config.#dbPath', 'this.#dbPath = this.config.dbPath');

fs.writeFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', content);
