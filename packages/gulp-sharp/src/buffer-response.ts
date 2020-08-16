/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import { OutputInfo } from 'sharp';

/**
 * Convenience Interface for sharp.toBuffer() response
 */
export interface IBufferResponse {
    data: Buffer;
    info: OutputInfo;
}
