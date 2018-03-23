import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../config';
import webpackConfig from './config.dev';

const compiler: webpack.Compiler = webpack(webpackConfig);

const webpackServer = new WebpackDevServer(compiler, {
    hot: true,
});

/* tslint:disable:no-console */
webpackServer.listen(config.PORT, (err /* , result */) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`webpack dev server listening on: ${config.PORT}`);
});
/* tslint:enable:no-console */
