/*
 * Package @donmahallem/ico
 * Source https://donmahallem.github.io/js-libs/
 */

const PNG_HEADER: Buffer = Buffer.from('89504E470D0A1A0A', 'hex');
export const isPNG = (source: Buffer, offset = 0): boolean => {
    return source.compare(PNG_HEADER, 0, PNG_HEADER.length, offset, offset + PNG_HEADER.length) === 0;
};
