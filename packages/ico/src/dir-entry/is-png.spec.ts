/*!
 * Source https://github.com/donmahallem/js-libs Package: ico
 */

import { expect } from 'chai';
import { readFileSync } from 'fs';
import 'mocha';
import { join } from 'path';
import { isPNG } from './is-png';

// tslint:disable:no-unused-expression
describe('./dir-entry/is-png', (): void => {
    const testPngFile: Buffer = readFileSync(join(process.cwd(), './test/test.png'));
    describe('isPNG', (): void => {
        it(`should return true for source file`, (): void => {
            expect(isPNG(testPngFile)).to.be.true;
        });

        it(`should return false for source file with stripped header`, (): void => {
            expect(isPNG(testPngFile.slice(1))).to.be.false;
        });
        it(`should return true for source file with offset`, (): void => {
            const testBuffer: Buffer = Buffer.alloc(100, 0);
            testPngFile.copy(testBuffer, 2, 0, 98);
            expect(isPNG(testBuffer)).to.be.false;
            expect(isPNG(testBuffer, 2)).to.be.true;
        });
    });
});
