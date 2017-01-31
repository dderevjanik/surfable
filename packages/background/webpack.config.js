const webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: ['./src/Main.ts'],
    target: 'web',
    resolve: {
        extensions: ['', '.webpack.js', '.ts']
    },
    output: {
        path: path.resolve('../../dist'),
        filename: 'background.js',
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(require('./package.json').version)
        })
    ],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader?configFileName=tsconfig.json',
                exclude: ['node_modules', 'dist', 'example'],
                include: [
                    path.resolve(__dirname, 'src')
                ],
            }
        ]
    }
};
