/*!
 * Source https://github.com/donmahallem/js-libs Package: ico
 */

import { DIRECTORY_SIZE, FILE_HEADER_SIZE } from './constants';
import { readDirEntry, EntryType, ImageFormat, IIcoData } from './dir-entry';
import { Type } from './type';

/**
 * Extracts meta data from file
 * @param buff ico file data
 */
export const parseIco = <T extends Type>(buff: Buffer): IIcoData<T> => {
    const type: T = buff.readUInt16LE(2) as T;
    const numImages: number = buff.readUInt16LE(4);
    const dibs: EntryType<T>[] = [];
    for (let i: number = 0; i < numImages; i++) {
        const dirEntry: EntryType<T> = readDirEntry(buff, (i * DIRECTORY_SIZE) + FILE_HEADER_SIZE, type);
        dibs.push(dirEntry);
    }

    return {
        format: ImageFormat.PNG,
        images: dibs,
        type,
    };
};
