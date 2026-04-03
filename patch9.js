const fs = require('fs');
const pkgPath = './src/Generate-Backend/mermaid-render/package.json';
let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.engines.node = ">=22.5.0";
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
