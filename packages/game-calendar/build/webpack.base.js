const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')
const firebaseSettings = require('../firebase-config.json')

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ]
  },
  resolve: {
    alias: {
      react:       'preact/compat',
      'react-dom': 'preact/compat',
    },
    extensions: [ '.js', '.tsx', '.ts' ],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './static/index.html',      to: 'index.html'        },
        { from: './static/manifest.json',   to: 'manifest.json'     },
        { from: './static/img/favicon.png', to: './img/favicon.png' },
        { from: './static/img/logo.png',    to: './img/logo.png'    },
        { from: './static/img/logo512.png', to: './img/logo512.png' },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode:   'static',
      reportFilename: 'report.html',
      defaultSizes:   'parsed',
      openAnalyzer:   false
    }),
    new webpack.DefinePlugin(Object.entries(firebaseSettings).reduce((acc, [ key, val ]) => {
        acc[key] = JSON.stringify(val)
        return acc
    }, { })),
  ],
}
