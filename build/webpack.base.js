const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        'app': './src/main.tsx',
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
            react: 'preact/compat',
            'react-dom': 'preact/compat',
        },
        extensions: [ '.js', '.tsx', '.ts', '.json' ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            './src/index.html',
            './src/manifest.json',
            { from: './static/img/favicon.png', to: './img/favicon.png' },
            { from: './static/img/logo.png', to: './img/logo.png' },
            { from: './static/img/logo512.png', to: './img/logo512.png' }
        ]),
    ]
}
