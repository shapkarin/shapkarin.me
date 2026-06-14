const path = require("path");
const CracoLessPlugin = require("craco-less");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const FontPreloadPlugin = require("webpack-font-preload-plugin");

const createInlineCssHtmlPlugin = (htmlWebpackPlugin, tests) => {
  const getInlinedTag = (publicPath, compilation, tag) => {
    if (
      tag.tagName !== 'link' ||
      !tag.attributes ||
      tag.attributes.rel !== 'stylesheet' ||
      !tag.attributes.href
    ) {
      return tag;
    }

    const cssName = publicPath
      ? tag.attributes.href.replace(publicPath, '')
      : tag.attributes.href.replace(/^\//, '');

    if (!tests.some((test) => cssName.match(test))) {
      return tag;
    }

    const asset = compilation.getAsset(cssName);

    if (asset == null) {
      return tag;
    }

    const css = String(asset.source.source())
      .replace(/\/\*# sourceMappingURL=.*?\*\/\s*$/s, '')
      .replace(/<\/style/gi, '<\\/style');

    return { tagName: 'style', innerHTML: css, closeTag: true };
  };

  return {
    apply(compiler) {
      if (compiler.options.mode !== 'production') {
        return;
      }

      let publicPath = compiler.options.output.publicPath || '';

      if (publicPath && !publicPath.endsWith('/')) {
        publicPath += '/';
      }

      compiler.hooks.compilation.tap('InlineCssHtmlPlugin', (compilation) => {
        const tagFunction = (tag) =>
          getInlinedTag(publicPath, compilation, tag);

        const hooks = htmlWebpackPlugin.getHooks(compilation);

        hooks.alterAssetTagGroups.tap('InlineCssHtmlPlugin', (assets) => {
          assets.headTags = assets.headTags.map(tagFunction);
          assets.bodyTags = assets.bodyTags.map(tagFunction);
        });
      });
    },
  };
};

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
      createInlineCssHtmlPlugin(HtmlWebpackPlugin, [/^static\/css\/main\..+\.css$/]),
    ],
  },
  plugins: [{ plugin: CracoLessPlugin }],
}
