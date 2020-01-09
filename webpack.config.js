const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: './js/bundle.js'
    },
    devtool: "source-map",
    devServer: {
        port: 8001,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            {
                test: /\.pcss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    }
                ],
            },
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader'
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index.pug',
        }),
        new CopyWebpackPlugin([
            {
                from: './src/assets/fonts',
                to: './assets/fonts',
            },
            {
                from: './src/assets/favicon',
                to: './assets/favicon',
            },
            {
                from: './src/assets/images',
                to: './assets/images'
            }
        ]),
    ]
};