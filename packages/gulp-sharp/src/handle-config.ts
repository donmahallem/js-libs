/**
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import sharp, { ResizeOptions, Sharp, SharpOptions } from 'sharp';
import { BufferFile } from 'vinyl';

export interface ISharpConfig {
    format?: Parameters<Sharp['toFormat']>[0];
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
