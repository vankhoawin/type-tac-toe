import webpack from 'webpack';
import webpackConfig from './config.prod';

const compiler: webpack.Compiler = webpack(webpackConfig);

/* tslint:disable:no-console */
compiler.run((err: Error, stats: webpack.Stats) => {
    if (err) {
        console.error(err);
        return;
    }

    const jsonStats: any = stats.toJson();

    if (jsonStats.hasErrors) {
        jsonStats.errors.map((statError: string) => console.error(statError));
        return;
    }

    if (jsonStats.hasWarnings) {
        console.warn('Webpack generated the following warnings: ');
        jsonStats.warnings.map((warning: string) => console.warn(warning));
    }

    console.log(`Webpack stats: ${stats}`); // eslint-disable-line no-console
});
/* tslint:enable:no-console */
