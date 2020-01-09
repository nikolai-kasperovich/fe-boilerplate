const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

    return templateFiles.map(item => {
        const parts = item.split('.');
        const fileName = parts[0];
        const fileExt = parts[1];

        return new HtmlWebpackPlugin({
            filename: `${fileName}.html`,
            template: path.resolve(__dirname, `${templateDir}/${fileName}.${fileExt}`)
        });
    });
}

const htmlPlugins = generateHtmlPlugins('./src/pages');

module.exports = {
    entry: glob.sync('./src/**/*.js'),
    output: {
        filename: './js/bundle.js'
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
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
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    }
                ],
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
                use: 'file-loader'
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
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
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
    ].concat(htmlPlugins)
};