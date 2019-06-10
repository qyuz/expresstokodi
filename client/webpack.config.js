const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: [
        `${repoRoot}/client/src/index.js`
    ],
    output: {
        path: `${repoRoot}/client/target`,
        filename: 'index.js',
        publicPath: '/target',
    },
    plugins: [
        new CleanWebpackPlugin(['client/target/*'], {
            root: repoRoot,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ]
    },
};
