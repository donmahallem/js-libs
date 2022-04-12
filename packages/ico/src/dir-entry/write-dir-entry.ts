/*
 * Package @donmahallem/ico
 * Source https://donmahallem.github.io/js-libs/
 */

import { Type } from '../type';
import { EntryType, IconDirEntry, ICursorDirEntry, IIconDirEntry } from './dir-entry';

const writeDirEntryCommon = (buf: Buffer, offset: number, entry: IconDirEntry): void => {
    if (entry.width > 256 || entry.height > 256 || entry.width < 1 || entry.height < 1) {
        throw new Error('Image dimensions must be 1 <= size <= 256');
    }
    // Write width
    buf.writeUInt8(entry.width % 256, offset);
    // Write height
    buf.writeUInt8(entry.height % 256, offset + 1);
    // Specifies number of colors in the color palette.
    // Should be 0 if the image does not use a color palette.
    buf.writeUInt8(0, offset + 2);
    // Reserved. 0
    buf.writeUInt8(0, offset + 3);
    buf.writeUInt32LE(entry.byteSize, offset + 8);
    buf.writeUInt32LE(entry.byteOffset, offset + 12);
};

export const writeCursorDirEntry = (buf: Buffer, offset: number, entry: ICursorDirEntry): void => {
    writeDirEntryCommon(buf, offset, entry);
    if (entry.hotspotX >= entry.width || entry.hotspotY >= entry.height || entry.hotspotX < 0 || entry.hotspotY < 0) {
        throw new Error('The hotspot must be within the image dimensions');
    }
    buf.writeUInt16LE(entry.hotspotX || 0, offset + 4);
    buf.writeUInt16LE(entry.hotspotY || 0, offset + 6);
};

export const writeIconDirEntry = (buf: Buffer, offset: number, entry: IIconDirEntry): void => {
    writeDirEntryCommon(buf, offset, entry);
    buf.writeUInt16LE(entry.colorPlanes || 1, offset + 4);
    buf.writeUInt16LE(entry.bpp || 24, offset + 6);
};

export const writeDirEntry = <T extends Type>(buf: Buffer, offset: number, entry: EntryType<T>, type: T): void => {
    switch (type) {
        case Type.CURSOR:
            writeCursorDirEntry(buf, offset, entry as ICursorDirEntry);
            break;
        case Type.ICON:
            writeIconDirEntry(buf, offset, entry as IIconDirEntry);
            break;
        default:
            throw new Error(`Unknown entry type ${type}`);
    }
};
