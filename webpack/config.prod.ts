import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import webpack from 'webpack';
import config from '../config';

const webpackConfig: webpack.Configuration = {
    context: path.resolve(__dirname, '..', 'src'),
    entry: './index.ts',
    mode: 'production',
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
                        loader: 'sass-loader',
                        options: {
                            data: `$board_size: ${config.BOARD_SIZE};`,
                        },
                    },
                ],
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: 'index.html',
        }),
        new webpack.DefinePlugin({
            BOARD_SIZE: config.BOARD_SIZE,
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, '..', 'dist')),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.scss'],
    },
};

export default webpackConfig;
