import CleanWebpackPlugin from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
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
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '..', 'dist'),
    },
    plugins: [
        new HtmlWebPackPlugin({
            GA_ANALYTICS_ID: config.GA_ANALYTICS_ID,
            filename: 'index.html',
            template: 'index.ejs',
        }),
        new webpack.DefinePlugin({
            BOARD_SIZE: config.BOARD_SIZE,
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, '..', 'dist')),
        new CompressionPlugin({
            algorithm: 'gzip',
            asset: '[path].gz[query]',
            minRatio: 0.8,
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.scss'],
    },
};

export default webpackConfig;
