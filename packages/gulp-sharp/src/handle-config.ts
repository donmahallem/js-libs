/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import * as sharp from 'sharp';
import { BufferFile } from 'vinyl';

export interface ISharpConfig {
    format?: keyof sharp.FormatEnum;
    resize?: sharp.ResizeOptions;
}
export const handleConfig = (inputFile: BufferFile, config: ISharpConfig, sharpInit?: sharp.SharpOptions): sharp.Sharp => {
    let sharpInstance: sharp.Sharp = sharp(inputFile.contents, sharpInit);
    if (config.resize) {
        sharpInstance = sharpInstance.resize(config.resize);
    }
    if (config.format) {
        sharpInstance = sharpInstance.toFormat(config.format);
    }

    return sharpInstance;
};
