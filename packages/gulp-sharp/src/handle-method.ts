/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import * as sharp from 'sharp';
import { BufferFile } from 'vinyl';

export type SharpHandler = (sh: sharp.Sharp) => sharp.Sharp;
export const handleMethod = (inputFile: BufferFile, handler: SharpHandler, sharpInit?: sharp.SharpOptions): sharp.Sharp => {
    const sharpInstance: sharp.Sharp = sharp(inputFile.contents, sharpInit);
    return handler(sharpInstance);
};
