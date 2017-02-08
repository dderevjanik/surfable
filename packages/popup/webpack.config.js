const webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: ['./src/Main.ts'],
    target: 'web',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx']
    },
    output: {
        path: path.resolve('../../dist'),
        filename: 'popup.js',
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
                exclude: ['dist', 'example'],
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, '../common'),
                ],
            }
        ]
    }
};
