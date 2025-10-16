/**
 * Package @donmahallem/ico
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as testObj2 from './read-dir-entry.js';
import * as testObj from './write-dir-entry.js';
import { Type } from '../type.js';

const testSizes: number[] = [23, 64, 256];
describe('./read-write', function (): void {
    describe('createEntry()', function (): void {
        describe('Icon', function (): void {
            describe('width', function (): void {
                /* eslint-disable mocha/no-setup-in-describe */
                testSizes.forEach((testSize: number): void => {
                    it(`should set the width to ${testSize}`, function (): void {
                        const testBuffer: Buffer = Buffer.alloc(16, 0, 'binary');
                        testObj.writeDirEntry(
                            testBuffer,
                            0,
                            {
                                byteOffset: 25,
                                byteSize: 292,
                                height: 32,
                                width: testSize,
                            },
                            Type.ICON
                        );
                        expect(testBuffer).to.be.instanceOf(Buffer, 'method should return a buffer instance');
                        expect(testBuffer.length).to.equal(16);
                        expect(testBuffer.readInt8(0)).to.equal(testSize % 256);
                    });
                });
            });

            describe('height', function (): void {
                /* eslint-disable mocha/no-setup-in-describe */
                testSizes.forEach((testSize: number): void => {
                    it(`should set the width to ${testSize}`, function (): void {
                        const testBuffer: Buffer = Buffer.alloc(16, 0, 'binary');
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const testData: any = {
                            byteOffset: 25,
                            byteSize: 292,
                            height: testSize,
                            width: 32,
                        };
                        testObj.writeDirEntry(
                            testBuffer,
                            0,
                            {
                                byteOffset: 25,
                                byteSize: 292,
                                height: testSize,
                                width: 32,
                            },
                            Type.ICON
                        );
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const output: any = testObj2.readDirEntry(testBuffer, 0, Type.ICON);
                        expect(testBuffer).to.be.instanceOf(Buffer, 'method should return a buffer instance');
                        expect(output).to.deep.equal(
                            Object.assign(
                                {
                                    bpp: 24,
                                    colorPlanes: 1,
                                },
                                testData
                            )
                        );
                        expect(testBuffer.readInt8(1)).to.equal(testSize % 256);
                    });
                });
            });
        });
    });
});
