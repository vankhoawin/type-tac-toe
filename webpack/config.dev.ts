import HtmlWebPackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import config from '../config';
import webpackCommonConfig from './config.common';

const webpackDevConfig: webpack.Configuration = {
    ...webpackCommonConfig,
    entry: [
        ...webpackCommonConfig.entry as string[],
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://localhost:${config.PORT}`,
    ],
    mode: 'development',
    plugins: [
        ...webpackCommonConfig.plugins as webpack.Plugin[],
        new webpack.HotModuleReplacementPlugin(),
    ],
};

export default webpackDevConfig;
