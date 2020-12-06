/**
 * Base webpack config used across other specific configs
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const pkgDep = require('./package.json');


/** @type {webpack.Configuration} */
module.exports = {
  module: {
    rules: []
  },

  output: {
    path: path.join(__dirname, 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.ts', '.svelte'],
    modules: [path.join(__dirname, 'app'), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      GRPC_TRACE: 'all',
      GRPC_VERBOSITY: 'DEBUG',
    }),
  ]
};