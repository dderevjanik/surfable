const path = require('path');

module.exports = {
    entry: './src/popup/Main.ts',
    output: {
        filename: 'popup.js',
        path: './dist'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader?configFileName=tsconfig.json',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};
