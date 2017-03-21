const path = require('path');

module.exports = {
    entry: './src/background/Main.ts',
    output: {
        filename: 'background.js',
        path: './dist'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader?configFileName=tsconfig.json',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};
