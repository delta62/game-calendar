const config = require('./webpack.base')
const { merge } = require('webpack-merge')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
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
                exportLocalsConvention: 'camelCase',
                mode: resourcePath => {
                  if (/global\.scss$/.test(resourcePath)) {
                    return 'global'
                  }
                  return 'local'
                },
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
