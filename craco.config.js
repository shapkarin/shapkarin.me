const path = require("path");
const CracoLessPlugin = require("craco-less");
const webpack = require("webpack");

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
    ],
  },
  plugins: [{ plugin: CracoLessPlugin }],
}