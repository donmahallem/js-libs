/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import * as sharp from 'sharp';
import { BufferFile } from 'vinyl';
import { sharpBufferToVinylBuffer } from './buffer-to-vinyl-buffer';

export type SharpHandler = (sh: sharp.Sharp) => sharp.Sharp;
export const handleMethod = (inputFile: BufferFile, handler: SharpHandler): Promise<BufferFile> => {
    const sharpInstance: sharp.Sharp = sharp(inputFile.contents);
    return handler(sharpInstance)
        .toBuffer({ resolveWithObject: true })
        .then(sharpBufferToVinylBuffer(inputFile));
};
