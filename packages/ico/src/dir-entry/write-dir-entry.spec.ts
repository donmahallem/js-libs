/*!
 * Source https://github.com/donmahallem/js-libs Package: ico
 */

import { expect } from 'chai';
import 'mocha';
import * as testObj from './write-dir-entry';
import { Type } from '../type';

const testSizes: number[] = [23, 64, 256];
describe('./create-entry', (): void => {
    describe('createEntry()', (): void => {
        describe('Icon', (): void => {
            describe('width', (): void => {
                testSizes.forEach((testSize: number): void => {
                    it(`should set the width to ${testSize}`, (): void => {
                        const testBuffer: Buffer = Buffer.alloc(16, 0, 'binary');
                        testObj.writeDirEntry(testBuffer, 0, {
                            byteOffset: 25,
                            byteSize: 292,
                            height: 32,
                            width: testSize,
                        }, Type.ICON);
                        expect(testBuffer).to.be.instanceOf(Buffer, 'method should return a buffer instance');
                        expect(testBuffer.length).to.equal(16);
                        expect(testBuffer.readInt8(0)).to.equal(testSize % 256);
                    });
                });
            });
            describe('height', (): void => {
                testSizes.forEach((testSize: number): void => {
                    it(`should set the width to ${testSize}`, (): void => {
                        const testBuffer: Buffer = Buffer.alloc(16, 0, 'binary');
                        testObj.writeDirEntry(testBuffer, 0, {
                            byteOffset: 25,
                            byteSize: 292,
                            height: testSize,
                            width: 32,
                        }, Type.ICON);
                        expect(testBuffer).to.be.instanceOf(Buffer, 'method should return a buffer instance');
                        expect(testBuffer.length).to.equal(16);
                        expect(testBuffer.readInt8(1)).to.equal(testSize % 256);
                    });
                });
            });
        });
        describe('Cursor', (): void => {

        });
    });
});
