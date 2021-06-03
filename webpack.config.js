const path = require('path');
const slsw = require('serverless-webpack');
const WebpackStrip = require('strip-loader');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'production',
  stats: 'minimal',
  // devtool: 'nosources-source-map',
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, '../../node_modules'),
        use: [WebpackStrip.loader('logger.debug', 'logger.info', 'console.log'), 'babel-loader']
      }
    ]
  },
  optimization: {
    minimize: true,
    removeAvailableModules: true,
    mangleWasmImports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false,
        parallel: true
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              discardEmpty: { removeAll: true },
              discardDuplicates: { removeAll: true },
              discardOverridden: { removeAll: true }
            }
          ]
        }
      })
    ]
  },
  externals: {
    'mongodb-client-encryption': path.resolve(
      __dirname,
      '../../node_modules/mongoose/node_modules/mongodb/lib/mongodb-client-encryption'
    ),
    'mongodb-client-encryption': path.resolve(__dirname, '../../node_modules/mongodb/lib/mongodb-client-encryption')
  }
};
