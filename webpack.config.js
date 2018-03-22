const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = require('./src/config');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.ts', '.scss'],
  },
  entry: './src/index.ts',
  module: {
    rules: [
      {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'tslint-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
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
      template: './src/index.html',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      BOARD_SIZE: config.BOARD_SIZE,
    }),
  ],
};
