/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-ncc
 */

interface INccResult { code: string; map: string; assets: any; }
/**
 * This is required because of ncc's weird export behavior and rollup doesn't recognize the default export
 */
// tslint:disable-next-line:no-var-requires
const ncc: (path: string, cfg: any) => Promise<INccResult> = require('@vercel/ncc');
import { basename, dirname, extname, join, resolve } from 'path';
import PluginError from 'plugin-error';
import { Transform } from 'stream';
import through from 'through2';
import VinylFile from 'vinyl';
import { IPluginConfig } from './config';
const PLUGIN_NAME: string = '__BUILD_PACKAGE_NAME__';
export const gulpNcc = (cfg?: IPluginConfig): Transform => {
    // tslint:disable-next-line:triple-equals
    return through.obj(function (file: VinylFile, encoding: BufferEncoding, callback: through.TransformCallback): void {
        if (file.isStream()) {
            return callback(new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
        } else if (file.isBuffer() || file.isNull()) {
            console.log(resolve(process.cwd(), file.path));
            const nccPromise: Promise<INccResult> = ncc(file.path, cfg);
            nccPromise
                .then((output: INccResult): void => {
                    const outputFile: VinylFile = file.clone({ contents: false });
                    outputFile.contents = Buffer.from(output.code, 'utf8');
                    this.push(outputFile, 'utf8');
                    const fileExtension: string = extname(file.basename);
                    const filename: string = basename(file.basename, fileExtension);
                    outputFile.basename = filename + '.js';
                    if (cfg?.sourceMap === true) {
                        const outputSourcemapFile: VinylFile = new VinylFile({
                            contents: Buffer.from(output.map, 'utf8'),
                            cwd: file.cwd,
                            path: join(dirname(file.path), filename + '.map.js'),
                        });
                        // callback(undefined, outputSourcemapFile);
                        this.push(outputSourcemapFile, 'utf8');
                    }
                    callback();
                }, (err: any): void => {
                    callback(new PluginError(PLUGIN_NAME, err, { message: 'Error while transforming file' }));
                });
        }
    });
};
