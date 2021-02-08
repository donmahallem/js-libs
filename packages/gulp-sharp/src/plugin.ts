/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import deepmerge from 'deepmerge';
import PluginError from 'plugin-error';
import { Sharp } from 'sharp';
import { Transform } from 'stream';
import * as through from 'through2';
import * as VinylFile from 'vinyl';
import { IConfig } from './config';
import { handleConfig } from './handle-config';
import { handleMethod } from './handle-method';
import { sharpToVinylBuffer } from './sharp-to-vinyl-buffer';

const PLUGIN_NAME: string = '__BUILD_PACKAGE_NAME__';
export const gulpSharp = (cfg: IConfig): Transform => {
    // tslint:disable-next-line:triple-equals
    if (cfg == undefined || cfg.transform == undefined) {
        throw new Error('transform must be provided via config');
    }
    return through.obj((file: VinylFile, encoding: BufferEncoding, callback: through.TransformCallback): void => {
        if (file.isNull()) {
            return callback(undefined, file);
        } else if (file.isStream()) {
            return callback(new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
        } else if (file.isBuffer()) {
            const mergedConfig: IConfig = (cfg && file.sharp_config) ? deepmerge(cfg, file.sharp_config as IConfig) : cfg;
            let sharpInstance: Sharp;
            if (typeof (mergedConfig.transform) === 'function') {
                sharpInstance = handleMethod(file, mergedConfig.transform, cfg.config);
            } else {
                sharpInstance = handleConfig(file, mergedConfig.transform, cfg.config);
            }
            sharpToVinylBuffer(sharpInstance, file, mergedConfig)
                .then((convertedFile: VinylFile.BufferFile): void => {
                    callback(undefined, convertedFile);
                }, (err: any): void => {
                    callback(new PluginError(PLUGIN_NAME, err, { message: 'Error while transforming file' }));
                });
        }
    });
};
