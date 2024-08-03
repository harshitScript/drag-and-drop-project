const path = require('path')

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
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
    }
}