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
        new HtmlWebPackPlugin({
            GA_ANALYTICS: config.GA_ANALYTICS,
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                removeComments: true,
            },
            template: 'src/template.ejs',
        }),
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
