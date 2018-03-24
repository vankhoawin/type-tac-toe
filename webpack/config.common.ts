import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import config from '../config';

const webpackCommonConfig: webpack.Configuration = {
    context: path.resolve(__dirname, '..'),
    entry: [
        path.resolve(__dirname, '..', 'src', 'index.ts'),
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                loader: 'tslint-loader',
                test: /\.ts$/,
            },
            {
                exclude: /node_modules/,
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (/* loader */) => [
                                require('autoprefixer')(),
                                require('cssnano')(),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            data: `$board_size: ${config.BOARD_SIZE};`,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new FaviconsWebpackPlugin(path.resolve(__dirname, '..', 'public', 'tictactoe.png')),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.scss'],
    },
};

export default webpackCommonConfig;
