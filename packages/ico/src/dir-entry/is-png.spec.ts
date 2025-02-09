/*
 * Package @donmahallem/ico
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import { readFileSync } from 'fs';
import 'mocha';
import { join } from 'path';
import { isPNG } from './is-png';

/* eslint-disable @typescript-eslint/no-unused-expressions */
describe('./dir-entry/is-png', function (): void {
    /* eslint-disable mocha/no-setup-in-describe */
    const testPngFile: Buffer = readFileSync(join(process.cwd(), './test/test.png'));

    describe('isPNG', function (): void {
        it(`should return true for source file`, function (): void {
            expect(isPNG(testPngFile)).to.be.true;
        });

        it(`should return false for source file with stripped header`, function (): void {
            expect(isPNG(testPngFile.slice(1))).to.be.false;
        });

        it(`should return true for source file with offset`, function (): void {
            const testBuffer: Buffer = Buffer.alloc(100, 0);
            testPngFile.copy(testBuffer, 2, 0, 98);
            expect(isPNG(testBuffer)).to.be.false;
            expect(isPNG(testBuffer, 2)).to.be.true;
        });
    });
});
