/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import * as  istanbul from 'istanbul';
import * as libCoverage from 'istanbul-lib-coverage';
import * as libReport from 'istanbul-lib-report';
import * as reports from 'istanbul-reports';
import { join as pathJoin } from 'path';
import * as PluginError from 'plugin-error';
import { Transform } from 'stream';
import * as through from 'through2';
import * as VinylFile from 'vinyl';
const PLUGIN_NAME: string = '__BUILD_PACKAGE_NAME__';
export interface IConfig<T = keyof reports.ReportOptions> {
    /**
     * Root dir
     * Default: ./
     */
    rootDir?: string;
    /**
     * Dir to merge coverages into.
     * Default: ./coverage
     */
    mergeDir?: string;
    reports: Partial<reports.ReportOptions>;
}

export const mergeCoverage = (cfg: IConfig): Transform => {
    const rootDir: string = cfg.rootDir || './';
    const mergeDir: string = cfg.mergeDir || './';
    let mergedCoverageMap: libCoverage.CoverageMap;
    const collector: istanbul.Collector = new istanbul.Collector();
    const reporter: istanbul.Reporter = new istanbul.Reporter();

    return through.obj((file: VinylFile, encoding: BufferEncoding, callback: through.TransformCallback): void => {
        if (file.isNull()) {
            return callback(undefined, file);
        }
        if (file.isDirectory()) {
            return callback(new PluginError(PLUGIN_NAME, 'Directories are not supported'));
        } else if (file.isStream()) {
            return callback(new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
        } else if (file.isBuffer()) {
            const map: libCoverage.CoverageMap = libCoverage.createCoverageMap();
            // tslint:disable-next-line:triple-equals
            if (mergedCoverageMap != undefined) {
                mergedCoverageMap.merge(map);
            } else {
                mergedCoverageMap = map;
            }
            collector.add(JSON.parse(file.contents?.toString()));
        }
    }, (done: () => void): void => {

        const context: libReport.Context = libReport.createContext({
            coverageMap: mergedCoverageMap,
            defaultSummarizer: 'nested',
            dir: pathJoin(rootDir, mergeDir),
        });
        for (const key of Object.keys(cfg.reports)) {
            const currentReporter: libReport.Visitor<libReport.Node> = reports.create(key as keyof reports.ReportOptions, cfg.reports[key]);

            currentReporter.execute(context);
        }
        reporter.add('text');
        reporter.addAll(['lcov', 'clover']);
        reporter.write(collector, sync, function () {
            console.log('All reports generated');
        });

        done();
    });
};
