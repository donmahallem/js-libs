/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import { OutputInfo } from 'sharp';
import { BufferFile } from 'vinyl';

type Signature = (data: { data: Buffer, info: OutputInfo }) => BufferFile;
export const sharpBufferToVinylBuffer: (inputFile: BufferFile) => Signature = (inputFile: BufferFile): Signature => {
    return (data: { data: Buffer, info: OutputInfo }): BufferFile => {
        const newFile: BufferFile = inputFile.clone({ contents: false });
        newFile.contents = data.data;
        return newFile;
    };
};
