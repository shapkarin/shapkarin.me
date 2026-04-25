const path = require("path");
const CracoLessPlugin = require("craco-less");
const webpack = require("webpack");
const FontPreloadPlugin = require("webpack-font-preload-plugin");

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    resolve: {
      fallback: {
        "buffer": require.resolve("buffer/")
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      // Exclude Generate-Backend directory from build
      new webpack.IgnorePlugin({
        resourceRegExp: /src\/Generate-Backend/,
      }),
      // preload fonts using html <link> preload
      new FontPreloadPlugin({
        extensions: ['woff2'],
      }),
    ],
  },
  plugins: [{ plugin: CracoLessPlugin }],
}