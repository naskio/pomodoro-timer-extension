const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    context: path.resolve('./src'),
    entry: {
        popup: './popup/index.js',
        background: './background/index.js',
    },
    output: {
        path: path.resolve('./build'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                            plugins: ['@babel/plugin-proposal-class-properties'],
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader:
                    'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]',
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                },
            },
        ]
    },
    // resolve: {
    //     extensions: ['*', '.js', '.jsx']
    // },
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "../public/index.html",
            chunks: ['popup'],
            filename: './popup.html',
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer',
        }),
        new BrowserSyncPlugin({
            server: {
                baseDir: ['build'],
            },
            port: 3000,
            host: 'localhost',
            open: false,
        }),
        new CopyWebpackPlugin([
            {
                from: '../public/manifest.json',
            },
            {
                from: '../public/robots.txt',
            },
            {
                from: '../public/favicon.ico',
            },
            {
                from: '../public/*.png',
                to: '[name].[ext]',
            },
        ]),
    ],
};
