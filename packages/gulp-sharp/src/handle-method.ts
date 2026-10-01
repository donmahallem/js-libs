/**
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import sharp, { Sharp, SharpOptions } from 'sharp';
import { BufferFile } from 'vinyl';

export type SharpHandler = (sh: Sharp) => Sharp;
/**
 * Sharp handler
 * @param {BufferFile} inputFile input file
 * @param {SharpHandler} handler sharp handler
 * @param {SharpOptions} [sharpInit] sharp options
 */
export const handleMethod = (inputFile: BufferFile, handler: SharpHandler, sharpInit?: SharpOptions): Sharp => {
    const sharpInstance: Sharp = sharp(inputFile.contents, sharpInit);
    return handler(sharpInstance);
};
