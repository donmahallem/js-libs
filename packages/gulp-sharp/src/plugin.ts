/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import * as PluginError from 'plugin-error';
import { Transform } from 'stream';
import * as through from 'through2';
import * as VinylFile from 'vinyl';
import { IConfig } from './config';
import { handleConfig } from './handle-config';
import { handleMethod } from './handle-method';

const PLUGIN_NAME: string = '__BUILD_PACKAGE_NAME__';
const handleTransformPromise = (prom: Promise<VinylFile.BufferFile>, callback: through.TransformCallback): void => {
    prom.then((convertedFile: VinylFile.BufferFile): void => {
        callback(undefined, convertedFile);
    }).catch((err: any): void => {
        callback(new PluginError(PLUGIN_NAME, err, { message: 'Error while transforming file' }));
    });
};
export const gulpSharp = (cfg: IConfig): Transform => {
    return through.obj((file: VinylFile, encoding: BufferEncoding, callback: through.TransformCallback): void => {
        if (file.isNull()) {
            return callback(undefined, file);
        }

        if (file.isDirectory()) {
            return callback(new PluginError(PLUGIN_NAME, 'Directories are not supported'));
        } else if (file.isStream()) {
            return callback(new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
        } else if (file.isBuffer()) {
            if (typeof (cfg.transform) === 'function') {
                return handleTransformPromise(handleMethod(file, cfg.transform), callback);
            }
            return handleTransformPromise(handleConfig(file, cfg.transform), callback);
        }
    });
};
