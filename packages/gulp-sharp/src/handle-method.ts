/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import sharp from 'sharp';
import { BufferFile } from 'vinyl';

export type SharpHandler = (sh: sharp.Sharp) => sharp.Sharp;
/**
 * Sharp handler
 * @param inputFile input file
 * @param handler sharp handler
 * @param sharpInit sharp options
 */
export const handleMethod = (inputFile: BufferFile, handler: SharpHandler, sharpInit?: sharp.SharpOptions): sharp.Sharp => {
    const sharpInstance: sharp.Sharp = sharp(inputFile.contents, sharpInit);
    return handler(sharpInstance);
};
