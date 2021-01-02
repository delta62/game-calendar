const config = require('./webpack.base')
const { merge } = require('webpack-merge')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
  }
})
