/*
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import sharp from 'sharp';
import { BufferFile } from 'vinyl';

export type SharpHandler = (sh: sharp.Sharp) => sharp.Sharp;
/**
 * Sharp handler
 *
 * @param {BufferFile} inputFile input file
 * @param {SharpHandler} handler sharp handler
 * @param {sharp.SharpOptions} [sharpInit] sharp options
 */
export const handleMethod = (inputFile: BufferFile, handler: SharpHandler, sharpInit?: sharp.SharpOptions): sharp.Sharp => {
    const sharpInstance: sharp.Sharp = sharp(inputFile.contents, sharpInit);
    return handler(sharpInstance);
};
