const { merge } = require('webpack-merge');
const path = require('path');

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    main: './src/index.js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/, // regex to see which files to run babel on
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackManifestPlugin({
      // we need this because webpack automatically adds auto to name
      publicPath: '',
    })
  ].filter(Boolean),
});
