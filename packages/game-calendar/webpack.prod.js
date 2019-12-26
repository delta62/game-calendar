const config = require('./webpack.config')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(config, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            }
        ]
    },
    optimization: {
        usedExports: true
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
})
