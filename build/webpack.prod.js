const config = require('./webpack.base')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(config, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }
        ]
    },
    optimization: {
        usedExports: true,
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
})
