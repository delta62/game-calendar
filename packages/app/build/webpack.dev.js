const config = require('./webpack.base')
const { merge } = require('webpack-merge')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /.*\/app.bundle.js/, to: '/app.bundle.js' }],
    },
    host: '0.0.0.0',
    hot: true,
  },
})
