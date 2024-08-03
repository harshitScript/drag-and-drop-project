const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    devtool: 'inline-source-map', //? prerequesities: enable sourceMap in tsconfig.
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }, resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname),
            },
        ],
    },
}