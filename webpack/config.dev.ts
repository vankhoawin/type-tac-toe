import HtmlWebPackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import config from '../config';

const webpackConfig: webpack.Configuration = {
    context: path.resolve(__dirname, '..', 'src'),
    entry: [
        './index.ts',
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://localhost:${config.PORT}`,
    ],
    mode: 'development',
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
    plugins: [
        new HtmlWebPackPlugin({
            GA_ANALYTICS_ID: config.GA_ANALYTICS_ID,
            filename: 'index.html',
            template: 'index.ejs',
        }),
        new webpack.DefinePlugin({
            BOARD_SIZE: config.BOARD_SIZE,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.scss'],
    },
};

export default webpackConfig;
