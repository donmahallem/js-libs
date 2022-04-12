/*
 * Package @donmahallem/ico
 * Source https://donmahallem.github.io/js-libs/
 */

import { Type } from '../type';
import { EntryType, IBaseDirEntry } from './dir-entry';

export const readDirEntry = <T extends Type>(buf: Buffer, offset: number, type: T): EntryType<T> => {
    const width: number = buf.readUInt8(offset);
    const height: number = buf.readUInt8(offset + 1);
    const data: IBaseDirEntry = {
        byteOffset: buf.readUInt32LE(offset + 12),
        byteSize: buf.readUInt32LE(offset + 8),
        height: height === 0 ? 256 : height,
        width: width === 0 ? 256 : width,
    };
    if (type === Type.ICON) {
        return {
            ...data,
            bpp: buf.readUInt16LE(offset + 6),
            colorPlanes: buf.readUInt16LE(offset + 4),
        } as EntryType<T>;
    } else if (type === Type.CURSOR) {
        return {
            ...data,
            hotspotX: buf.readUInt16LE(offset + 4),
            hotspotY: buf.readUInt16LE(offset + 6),
        } as EntryType<T>;
    } else {
        throw new Error('Unknown type');
    }
};
