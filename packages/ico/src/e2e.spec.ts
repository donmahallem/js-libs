/*
 * Package @donmahallem/ico
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import { readFileSync } from 'fs';
import 'mocha';
import { join } from 'path';
import { generateIco, InputEntry, IIcoDataInput } from './create-ico';
import { IIconDirEntry, IIcoData } from './dir-entry';
import { parseIco } from './parse-ico';
import { Type } from './type';

describe('./e2e', (): void => {
    describe('decode and reencode', (): void => {
        const sourceImage: Buffer = readFileSync(join(process.cwd(), './test/test.ico'));
        it(`should decode and reencode equal to source data`, (): void => {
            const icoData: IIcoData<Type.ICON> = parseIco(sourceImage);
            const icoInput: IIcoDataInput<Type.ICON> = {
                format: icoData.format,
                images: icoData.images.map((val: IIconDirEntry): InputEntry<Type.ICON> => {
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
            for (let i = 0; i < icoData.images.length; i++) {
                const idxStart: number = 6 + i * 16;
                const idxEnd: number = idxStart + 16;
                expect(outputBuffer.slice(idxStart, idxEnd)).to.deep.equal(
                    sourceImage.slice(idxStart, idxEnd),
                    `ICO dir entry ${i} should match`
                );
            }
            expect(outputBuffer.compare(sourceImage)).to.equal(0, 'Input and output should be equal');
        });
    });
});
