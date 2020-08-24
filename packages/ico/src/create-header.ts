/*!
 * Source https://github.com/donmahallem/js-libs Package: ico
 */

import { FILE_HEADER_SIZE } from './constants';
import { Type } from './type';

/**
 * Creates the header portion of the ico/cur file
 * @param numImages number of images in ico file
 */
export const createHeader = (numImages: number, type: Type = Type.ICON): Buffer => {
    const headerBuffer: Buffer = Buffer.alloc(FILE_HEADER_SIZE);

    headerBuffer.writeUInt16LE(0, 0);
    headerBuffer.writeUInt16LE(type, 2);
    headerBuffer.writeUInt16LE(numImages, 4);

    return headerBuffer;
};
