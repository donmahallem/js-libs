/*
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import { OutputInfo } from 'sharp';
import { BufferFile } from 'vinyl';

type Signature = (data: { data: Buffer; info: OutputInfo }) => BufferFile;
export const sharpBufferToVinylBuffer: (inputFile: BufferFile) => Signature = (inputFile: BufferFile): Signature => {
    return (data: { data: Buffer; info: OutputInfo }): BufferFile => {
        const newFile: BufferFile = inputFile.clone({ contents: false });
        newFile.contents = data.data;
        return newFile;
    };
};
