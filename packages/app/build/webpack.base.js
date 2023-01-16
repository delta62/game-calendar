const firebaseSettings = require('../firebase-config.json')

const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          projectReferences: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './static/index.html', to: 'index.html' },
        { from: './static/img/favicon.png', to: './img/favicon.png' },
        { from: './static/img/logo.png', to: './img/logo.png' },
        { from: './static/img/logo512.png', to: './img/logo512.png' },
      ],
    }),
    new webpack.DefinePlugin(
      Object.entries(firebaseSettings).reduce((acc, [key, val]) => {
        acc[key] = JSON.stringify(val)
        return acc
      }, {})
    ),
  ],
}
