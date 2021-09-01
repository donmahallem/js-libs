/*
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import { OutputInfo } from 'sharp';

/**
 * Convenience Interface for sharp.toBuffer() response
 */
export interface IBufferResponse {
    data: Buffer;
    info: OutputInfo;
}
