/**
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import sharp, { FormatEnum, SharpOptions, ResizeOptions, Sharp } from 'sharp';
import { BufferFile } from 'vinyl';

export interface ISharpConfig {
    format?: keyof FormatEnum;
    resize?: ResizeOptions;
}
export const handleConfig = (inputFile: BufferFile, config: ISharpConfig, sharpInit?: SharpOptions): Sharp => {
    let sharpInstance: Sharp = sharp(inputFile.contents, sharpInit);
    if (config.resize) {
        sharpInstance = sharpInstance.resize(config.resize);
    }
    if (config.format) {
        sharpInstance = sharpInstance.toFormat(config.format);
    }

    return sharpInstance;
};
