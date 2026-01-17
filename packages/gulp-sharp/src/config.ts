/**
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import { SharpOptions } from 'sharp';
import { ISharpConfig } from './handle-config.js';
import { SharpHandler } from './handle-method.js';

export interface IConfig {
    config?: SharpOptions;
    /**
     * Specify if you want the file basename to be modified or speficy a pattern
     * Defaults to '{filename}_{width}w_{height}h.{ext}'
     */
    modifyFilename?: false | string;
    transform: ISharpConfig | SharpHandler;
}
