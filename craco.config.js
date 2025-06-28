const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    alias: {
      '@/Pages': path.resolve(__dirname, 'src/Pages'),
      '@/Components': path.resolve(__dirname, 'src/Components'),
      '@/Common/API': path.resolve(__dirname, 'src/API'),
      '@/Constants': path.resolve(__dirname, 'src/constants.js'),
    },
  },
  plugins: [{ plugin: CracoLessPlugin }],
}