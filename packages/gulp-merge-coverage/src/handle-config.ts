/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import * as sharp from 'sharp';
import { BufferFile } from 'vinyl';
import { sharpBufferToVinylBuffer } from './buffer-to-vinyl-buffer';

export interface ISharpConfig {
    format?: keyof sharp.FormatEnum;
    resize?: sharp.ResizeOptions;
}
export const handleConfig = (inputFile: BufferFile, config: ISharpConfig): Promise<BufferFile> => {
    let sharpInstance: sharp.Sharp = sharp(inputFile.contents);
    if (config.resize) {
        sharpInstance = sharpInstance.resize(config.resize);
    }
    if (config.format) {
        sharpInstance = sharpInstance.toFormat(config.format);
    }

    return sharpInstance
        .toBuffer({ resolveWithObject: true })
        .then(sharpBufferToVinylBuffer(inputFile));
};
