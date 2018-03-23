import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../config';
import webpackConfig from './config.dev';

const compiler: webpack.Compiler = webpack(webpackConfig);

const webpackServer = new WebpackDevServer(compiler, {
    hot: true,
});

webpackServer.listen(config.PORT, (err /* , result */) => {
    if (err) {
        // tslint:disable-next-line
        console.error(err);
        return;
    }

    // tslint:disable-next-line
    console.log(`webpack dev server listening on: ${config.PORT}`);
});
