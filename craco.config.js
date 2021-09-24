const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    alias: {
      Pages: path.resolve(__dirname, 'src/Pages'),
      Components: path.resolve(__dirname, 'src/Components'),
      Common: path.resolve(__dirname, 'src/Common'),
    },
  },
  plugins: [{ plugin: CracoLessPlugin }]
}