/*!
 * Source https://github.com/donmahallem/js-libs Package: ico
 */

import 'mocha';
import { readFileSync } from 'fs';
import { parseIco } from './parse-ico';
import { join } from 'path';
import { IIcoData, IIconDirEntry } from './dir-entry';
import { Type } from './type';
import { generateIco, IIcoDataInput, InputEntry } from './create-ico';
import { expect } from 'chai';

describe('./e2e', (): void => {
    describe('decode and reencode', (): void => {
        const sourceImage: Buffer = readFileSync(join(process.cwd(), './test/test.ico'));
        it(`should decode and reencode equal to source data`, (): void => {
            const icoData: IIcoData<Type.ICON> = parseIco(sourceImage);
            const icoInput: IIcoDataInput<Type.ICON> = {
                format: icoData.format,
                images: icoData.images
                    .map((val: IIconDirEntry): InputEntry<Type.ICON> => {
                        return {
                            bpp: val.bpp,
                            colorPlanes: val.colorPlanes,
                            data: sourceImage.slice(val.byteOffset, val.byteOffset + val.byteSize),
                            height: val.height,
                            width: val.width,
                        };
                    }),
                type: icoData.type,
            };
            const outputBuffer: Buffer = generateIco(icoInput);
            expect(outputBuffer.slice(0, 6)).to.deep.equal(sourceImage.slice(0, 6), 'ICO header should match');
            for (let i: number = 0; i < icoData.images.length; i++) {
                const idxStart: number = 6 + (i * 16);
                const idxEnd: number = idxStart + 16;
                expect(outputBuffer.slice(idxStart, idxEnd))
                    .to.deep.equal(sourceImage.slice(idxStart, idxEnd), `ICO dir entry ${i} should match`);
            }
            expect(outputBuffer.compare(sourceImage)).to.equal(0, 'Input and output should be equal');
        });
        describe('Cursor', (): void => {

        });
    });
});
