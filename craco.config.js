const path = require('path');
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    alias: {
      'Pages': path.resolve(__dirname, 'src/Pages'),
      'Components': path.resolve(__dirname, 'src/Components'),
      'Common/API': path.resolve(__dirname, 'src/API'),
    },
    configure: (webpackConfig) => {

      // Allow omitting .js/.jsx extensions
      if (!webpackConfig.resolve) {
        webpackConfig.resolve = {};
      }
      webpackConfig.resolve.fullySpecified = false;
      
      // Add fallback for 'buffer' module
      if (!webpackConfig.resolve.fallback) {
        webpackConfig.resolve.fallback = {};
      }
      webpackConfig.resolve.fallback.buffer = require.resolve('buffer/');

      return webpackConfig;
    },
  },
  plugins: [{ plugin: CracoLessPlugin }],
}