/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import { Sharp } from 'sharp';
import { BufferFile } from 'vinyl';
import { IBufferResponse } from './buffer-response';
import { IConfig } from './config';

export const sharpToVinylBuffer: (input: Sharp, sourceFile: BufferFile, cfg: IConfig) => Promise<BufferFile> =
    (input: Sharp, sourceFile: BufferFile, cfg: IConfig): Promise<BufferFile> => {
        return input
            .toBuffer({ resolveWithObject: true })
            .then((data: IBufferResponse): BufferFile => {
                const newFile: BufferFile = sourceFile.clone({ contents: false });
                newFile.contents = data.data;
                if (cfg.modifyFilename !== false) {
                    newFile.basename += `_${data.info.width}w_${data.info.width}h`;
                }
                newFile.extname = data.info.format;
                return newFile;
            });
    };
