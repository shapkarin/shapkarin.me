const fs = require('fs');

let content = fs.readFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', 'utf8');

const oldDB = `  /**
   * Initialize SQLite database for hash caching
   */
  async initDatabase() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
          return;
        }

        if (this.config.verbose) {
          console.log(\`📊 Connected to SQLite database: \${this.dbPath}\`);
        }

        // Create table if it doesn't exist
        this.db.run(\`
          CREATE TABLE IF NOT EXISTS mermaid_hashes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content_hash TEXT UNIQUE NOT NULL,
            svg_path TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        \`, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }

  /**
   * Close database connection
   */
  async closeDatabase() {
    if (this.db) {
      return new Promise((resolve) => {
        this.db.close((err) => {
          if (err) {
            console.error('Error closing database:', err);
          }
          resolve();
        });
      });
    }
  }

  /**
   * Check if SVG exists in cache and file system
   */
  async checkCachedSVG(contentHash) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT svg_path FROM mermaid_hashes WHERE content_hash = ?',
        [contentHash],
        async (err, row) => {
          if (err) {
            reject(err);
            return;
          }

          if (!row) {
            resolve(null);
            return;
          }

          // Check if SVG file actually exists
          try {
            await fs.access(row.svg_path);
            resolve(row.svg_path);
          } catch {
            // File doesn't exist, remove from cache
            this.db.run('DELETE FROM mermaid_hashes WHERE content_hash = ?', [contentHash]);
            resolve(null);
          }
        }
      );
    });
  }

  /**
   * Store SVG path in cache
   */
  async storeCachedSVG(contentHash, svgPath) {
    return new Promise((resolve, reject) => {
      this.db.run(
        \`INSERT OR REPLACE INTO mermaid_hashes (content_hash, svg_path, updated_at)
         VALUES (?, ?, CURRENT_TIMESTAMP)\`,
        [contentHash, svgPath],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }`;

const newDB = `  /**
   * Initialize SQLite database for hash caching
   */
  async initDatabase() {
    try {
      // Ensure directory exists
      await fs.mkdir(path.dirname(this.dbPath), { recursive: true });
      this.db = new DatabaseSync(this.dbPath);

      if (this.config.verbose) {
        console.log(\`📊 Connected to SQLite database: \${this.dbPath}\`);
      }

      // Create table if it doesn't exist
      this.db.exec(\`
        CREATE TABLE IF NOT EXISTS mermaid_hashes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          content_hash TEXT UNIQUE NOT NULL,
          svg_path TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_mermaid_hashes_content_hash ON mermaid_hashes(content_hash);
      \`);
    } catch (err) {
      console.error('Failed to initialize database:', err);
      throw err;
    }
  }

  /**
   * Close database connection
   */
  async closeDatabase() {
    if (this.db) {
      try {
        this.db.close();
      } catch (err) {
        console.error('Error closing database:', err);
      }
    }
  }

  /**
   * Check if SVG exists in cache and file system
   */
  async checkCachedSVG(contentHash) {
    try {
      const stmt = this.db.prepare('SELECT svg_path FROM mermaid_hashes WHERE content_hash = ?');
      const row = stmt.get(contentHash);

      if (!row) {
        return null;
      }

      // Check if SVG file actually exists
      try {
        await fs.access(row.svg_path);
        return row.svg_path;
      } catch {
        // File doesn't exist, remove from cache
        const delStmt = this.db.prepare('DELETE FROM mermaid_hashes WHERE content_hash = ?');
        delStmt.run(contentHash);
        return null;
      }
    } catch (err) {
      console.error('Error checking cached SVG:', err);
      throw err;
    }
  }

  /**
   * Store SVG path in cache
   */
  async storeCachedSVG(contentHash, svgPath) {
    try {
      const stmt = this.db.prepare(\`
        INSERT INTO mermaid_hashes (content_hash, svg_path, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(content_hash) DO UPDATE SET
          svg_path=excluded.svg_path,
          updated_at=CURRENT_TIMESTAMP
      \`);
      const info = stmt.run(contentHash, svgPath);
      return info.lastInsertRowid;
    } catch (err) {
      console.error('Error storing cached SVG:', err);
      throw err;
    }
  }`;

content = content.replace(oldDB, newDB);
fs.writeFileSync('./src/Generate-Backend/mermaid-render/mermaid-render.mjs', content);
