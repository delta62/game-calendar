const config = require('./webpack.base')
const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:   'static',
            reportFilename: 'report.html',
            defaultSizes:   'parsed',
            openAnalyzer:   false
        })
    ],
    devServer: {
        host: '0.0.0.0',
        hot: true,
    }
})
