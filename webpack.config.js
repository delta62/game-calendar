const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        'bundle': './src/main.tsx',
        'service-worker': './src/service-worker.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
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
        new CopyPlugin([
            './src/index.html',
            './src/manifest.json'
        ])
    ]
}
