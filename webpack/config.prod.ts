import CleanWebpackPlugin from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import webpack from 'webpack';
import config from '../config';
import webpackCommonConfig from './config.common';

const webpackProdConfig: webpack.Configuration = {
    ...webpackCommonConfig,
    mode: 'production',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '..', 'dist'),
    },
    plugins: [
        ...webpackCommonConfig.plugins as webpack.Plugin[],
        new CleanWebpackPlugin(path.resolve(__dirname, '..', 'dist')),
        new CompressionPlugin({
            algorithm: 'gzip',
            asset: '[path].gz[query]',
            minRatio: 0.8,
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
        }),
    ],
};

export default webpackProdConfig;
