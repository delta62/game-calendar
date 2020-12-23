const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const pkg = require('../package.json')
const webpack = require('webpack')

module.exports = {
    entry: {
        app:              './src/main.tsx',
        'service-worker': './src/service-worker.ts'
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
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(pkg.version),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode:   'static',
            reportFilename: 'report.html',
            defaultSizes:   'parsed',
            openAnalyzer:   false
        }),
    ],
}
