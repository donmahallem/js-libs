/*
 * Package @donmahallem/ico
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import { Type } from '../type';
import * as testObj2 from './read-dir-entry';
import * as testObj from './write-dir-entry';

const testSizes: number[] = [23, 64, 256];
describe('./read-write', (): void => {
    describe('createEntry()', (): void => {
        describe('Icon', (): void => {
            describe('width', (): void => {
                testSizes.forEach((testSize: number): void => {
                    it(`should set the width to ${testSize}`, (): void => {
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
            describe('height', (): void => {
                testSizes.forEach((testSize: number): void => {
                    it(`should set the width to ${testSize}`, (): void => {
                        const testBuffer: Buffer = Buffer.alloc(16, 0, 'binary');
                        const testData: any = {
                            byteOffset: 25,
                            byteSize: 292,
                            height: testSize,
                            type: Type.ICON,
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
