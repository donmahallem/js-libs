/*
 * Package @donmahallem/ico
 * Source https://donmahallem.github.io/js-libs/
 */

import { Type } from '../type';
export enum ImageFormat {
    PNG = 'png',
    BMP = 'bmp',
}
export interface IBaseDirEntry {
    /**
     * Icon Width
     * 1 <= width <= 256
     */
    width: number;
    /**
     * Icon Height
     * 1 <= height <= 256
     */
    height: number;
    /**
     * Size of the bitmap in bytes
     */
    byteSize: number;
    /**
     * Byte offset from the start of the file
     */
    byteOffset: number;
}

export type EntryType<T extends Type> = T extends Type.ICON ? IIconDirEntry : T extends Type.CURSOR ? ICursorDirEntry : never;

export interface IIcoData<T extends Type> {
    type: T;
    images: EntryType<T>[];
    format: ImageFormat;
}

export interface IIconDirEntry extends IBaseDirEntry {
    /**
     * Bits per pixel
     * Default 24
     */
    bpp?: number;

    colorPlanes?: number;
}
export interface ICursorDirEntry extends IBaseDirEntry {
    /**
     * Vertical Cursor Hotspot in pixels from the top
     * Must not exceed height
     */
    hotspotY: number;
    /**
     * Vertical Cursor Hotspot in pixels from the left
     * Must not exceed width
     */
    hotspotX: number;
}
export type IconDirEntry = IIconDirEntry | ICursorDirEntry;

type OmitByteInfo<T extends IconDirEntry> = Omit<T, 'byteOffset' | 'byteSize'>;

export type IconDirEntryInput = OmitByteInfo<IconDirEntry>;
