/*
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import { basename, extname } from 'path';
import { Sharp } from 'sharp';
import { BufferFile } from 'vinyl';
import { IBufferResponse } from './buffer-response';
import { IConfig } from './config';

/**
 * Converts a provided bufferfile with sharp
 *
 * @param input sharp instance
 * @param sourceFile input file
 * @param cfg sharp config
 */
export const sharpToVinylBuffer: (input: Sharp, sourceFile: BufferFile, cfg: IConfig) => Promise<BufferFile> = (
    input: Sharp,
    sourceFile: BufferFile,
    cfg: IConfig
): Promise<BufferFile> => {
    return input.toBuffer({ resolveWithObject: true }).then((data: IBufferResponse): BufferFile => {
        const newFile: BufferFile = sourceFile.clone({ contents: false });
        newFile.contents = data.data;
        if (cfg.modifyFilename !== false) {
            const fileBasename: string = basename(sourceFile.basename, extname(sourceFile.basename));
            newFile.basename = `${fileBasename}_${data.info.width}w_${data.info.height}h`;
        }
        newFile.extname = `.${data.info.format}`;
        return newFile;
    });
};
