/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import { SharpOptions } from 'sharp';
import { ISharpConfig } from './handle-config';
import { SharpHandler } from './handle-method';

export interface IConfig {
    config?: SharpOptions;
    /**
     * Specify if you want the file basename to be modified or speficy a pattern
     * Defaults to '{filename}_{width}w_{height}h.{ext}'
     */
    modifyFilename: false | string;
    transform: ISharpConfig | SharpHandler;
}
