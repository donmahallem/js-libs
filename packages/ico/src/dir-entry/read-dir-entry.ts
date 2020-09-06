/*!
 * Source https://github.com/donmahallem/js-libs Package: ico
 */

import { Type } from '../type';
import { EntryType } from './dir-entry';

export const readDirEntry = <T extends Type>(buf: Buffer, offset: number, type: T): EntryType<T> => {
    const width: number = buf.readUInt8(offset);
    const height: number = buf.readUInt8(offset + 1);
    const data: any = {
        byteOffset: buf.readUInt32LE(offset + 12),
        byteSize: buf.readUInt32LE(offset + 8),
        height: height === 0 ? 256 : height,
        type,
        width: width === 0 ? 256 : width,
    };
    if (type === Type.ICON) {
        data.colorPlanes = buf.readUInt16LE(offset + 4);
        data.bpp = buf.readUInt16LE(offset + 6);
    } else if (type === Type.CURSOR) {
        data.hotspotX = buf.readUInt16LE(offset + 4);
        data.hotspotY = buf.readUInt16LE(offset + 6);
    } else {
        throw new Error('Unknown type');
    }
    data.byteSize = buf.readUInt32LE(offset + 8);
    data.byteOffset = buf.readUInt32LE(offset + 12);
    return data;
};
