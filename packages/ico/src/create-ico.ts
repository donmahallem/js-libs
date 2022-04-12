/*
 * Package @donmahallem/ico
 * Source https://donmahallem.github.io/js-libs/
 */

import { DIRECTORY_SIZE, FILE_HEADER_SIZE } from './constants';
import { ImageFormat } from './dir-entry';
import { EntryType } from './dir-entry/dir-entry';
import { writeDirEntry } from './dir-entry/write-dir-entry';
import { Type } from './type';

export type InputEntry<T extends Type> = Omit<EntryType<T>, 'byteOffset' | 'byteSize'> & { data: Buffer };
export interface IIcoDataInput<T extends Type> {
    type: T;
    images: InputEntry<T>[];
    format: ImageFormat;
}
export const generateIco = <T extends Type = Type.ICON>(data: IIcoDataInput<T>): Buffer => {
    const dataOffset: number = data.images.length * DIRECTORY_SIZE + FILE_HEADER_SIZE;
    const dataSize: number = data.images.reduce((prev: number, cur: InputEntry<T>): number => {
        return cur.data.length - (data.format === ImageFormat.BMP ? 14 : 0) + prev;
    }, 0);
    const fileBuffer: Buffer = Buffer.alloc(dataOffset + dataSize, 'utf8', 'binary');
    fileBuffer.writeUInt16LE(0, 0);
    fileBuffer.writeUInt16LE(data.type, 2);
    fileBuffer.writeUInt16LE(data.images.length, 4);
    let currentDataIndex: number = dataOffset;
    for (let i = 0; i < data.images.length; i++) {
        const entry: InputEntry<T> = data.images[i];
        const sourceDataOffset: number = data.format === ImageFormat.BMP ? 14 : 0;
        const sourceDataLength: number = entry.data.length - sourceDataOffset;
        const entryData: EntryType<T> = Object.assign(
            {
                byteOffset: currentDataIndex,
                byteSize: sourceDataLength,
            } as EntryType<T>,
            entry
        );
        writeDirEntry(fileBuffer, FILE_HEADER_SIZE + i * DIRECTORY_SIZE, entryData, data.type);
        /**
         * Copy File Data
         * Strip BITMAPFILEHEADER from bmp
         */
        entry.data.copy(fileBuffer, currentDataIndex, sourceDataOffset);
        currentDataIndex += sourceDataLength;
    }

    return fileBuffer;
};
