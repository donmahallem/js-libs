/*
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import { readFileSync } from 'fs';
import 'mocha';
import PluginError from 'plugin-error';
import sharp from 'sharp';
import { Readable, Transform } from 'stream';
import Vinyl from 'vinyl';
import { gulpSharp } from './plugin';

const testFormats: (keyof sharp.FormatEnum)[] = ['jpeg', 'png', 'webp'];
const testSizes: number[] = [128, 256, 1024];

/* eslint-disable @typescript-eslint/no-unused-expressions */
describe('plugin', function (): void {
    describe('gulpSharp', function (): void {
        describe('convert with object', function (): void {
            /* eslint-disable mocha/no-setup-in-describe */
            testFormats.forEach((expectedFormat: keyof sharp.FormatEnum): void => {
                it(`should convert the image to ${expectedFormat} and keep size`, function (done: Mocha.Done): void {
                    const testBuffer: Buffer = readFileSync('test/test.png');
                    const testFile: Vinyl = new Vinyl({
                        contents: testBuffer,
                        path: '/test/anywhere.jpg',
                    });
                    const testInstance: Transform = gulpSharp({ transform: { format: expectedFormat } });
                    testInstance.once('data', (file: Vinyl): void => {
                        sharp(file.contents as Buffer)
                            .metadata()
                            .then((meta: sharp.Metadata): void => {
                                expect(Vinyl.isVinyl(file)).to.be.true;
                                expect(file.isBuffer()).to.be.true;
                                expect(meta.format).to.equal(expectedFormat);
                                expect(meta.width).to.equal(696, 'Image should be 696 pixel wide');
                                expect(meta.height).to.equal(564, 'Image should be 564 pixel high');
                                done();
                            })
                            .catch(done);
                    });
                    // write the fake file to it
                    testInstance.end(testFile);
                });
            });
            testSizes.forEach((expectedWidth: number): void => {
                it(`should keep format and scale the image to fit width ${expectedWidth}`, function (done: Mocha.Done): void {
                    const testBuffer: Buffer = readFileSync('test/test.png');
                    const testFile: Vinyl = new Vinyl({
                        contents: testBuffer,
                        path: '/test/anywhere.jpg',
                    });
                    const testInstance: Transform = gulpSharp({ transform: { resize: { fit: 'cover', width: expectedWidth } } });
                    const expectedHeight: number = Math.round((expectedWidth * 564) / 696);

                    testInstance.once('data', (file: Vinyl): void => {
                        sharp(file.contents as Buffer)
                            .metadata()
                            .then((meta: sharp.Metadata): void => {
                                // tslint:disable-next-line:no-unused-expression
                                expect(Vinyl.isVinyl(file)).to.be.true;
                                // tslint:disable-next-line:no-unused-expression
                                expect(file.isBuffer()).to.be.true;
                                expect(meta.format).to.equal('png');
                                expect(meta.width).to.equal(expectedWidth, `Image should be ${expectedWidth} pixel wide`);
                                expect(meta.height).to.equal(expectedHeight, `Image should be ${expectedHeight} pixel high`);
                                done();
                            })
                            .catch(done);
                    });
                    // write the fake file to it
                    testInstance.end(testFile);
                });
            });

            testSizes.forEach((expectedHeight: number): void => {
                it(`should keep format and scale the image to fit height ${expectedHeight}`, function (done: Mocha.Done): void {
                    const testBuffer: Buffer = readFileSync('test/test.png');
                    const testFile: Vinyl = new Vinyl({
                        contents: testBuffer,
                        path: '/test/anywhere.jpg',
                    });
                    const testInstance: Transform = gulpSharp({ transform: { resize: { fit: 'cover', height: expectedHeight } } });
                    const expectedWidth: number = Math.round((expectedHeight * 696) / 564);

                    testInstance.once('data', (file: Vinyl): void => {
                        sharp(file.contents as Buffer)
                            .metadata()
                            .then((meta: sharp.Metadata): void => {
                                // tslint:disable-next-line:no-unused-expression
                                expect(Vinyl.isVinyl(file)).to.be.true;
                                // tslint:disable-next-line:no-unused-expression
                                expect(file.isBuffer()).to.be.true;
                                expect(meta.format).to.equal('png');
                                expect(meta.width).to.equal(expectedWidth, `Image should be ${expectedWidth} pixel wide`);
                                expect(meta.height).to.equal(expectedHeight, `Image should be ${expectedHeight} pixel high`);
                                done();
                            })
                            .catch(done);
                    });
                    // write the fake file to it
                    testInstance.end(testFile);
                });
            });

            it('should override default config with the VinylFile provided', function (done: Mocha.Done): void {
                const expectedWidth = 128;
                const testBuffer: Buffer = readFileSync('test/test.png');
                const testFile: Vinyl = new Vinyl({
                    base: '/test/',
                    contents: testBuffer,
                    cwd: '/',
                    path: '/test/anywhere.jpg',
                    sharp_config: { transform: { resize: { width: expectedWidth } } },
                });
                const testInstance: Transform = gulpSharp({ transform: { resize: { fit: 'cover', width: 512 } } });
                const expectedHeight: number = Math.round((128 * 564) / 696);
                testInstance.once('data', (file: Vinyl): void => {
                    sharp(file.contents as Buffer)
                        .metadata()
                        .then((meta: sharp.Metadata): void => {
                            // tslint:disable-next-line:no-unused-expression
                            expect(Vinyl.isVinyl(file)).to.be.true;
                            // tslint:disable-next-line:no-unused-expression
                            expect(file.isBuffer()).to.be.true;
                            expect(file.basename).to.equal(`anywhere_${expectedWidth}w_${expectedHeight}h.png`);
                            expect(meta.format).to.equal('png');
                            expect(meta.width).to.equal(expectedWidth, `Image should be ${expectedWidth} pixel wide`);
                            expect(meta.height).to.equal(expectedHeight, `Image should be ${expectedHeight} pixel high`);
                            done();
                        })
                        .catch(done);
                });
                // write the fake file to it
                testInstance.end(testFile);
            });
        });

        it('should skip empty files', function (done: Mocha.Done): void {
            const testFile: Vinyl.NullFile = new Vinyl({
                // tslint:disable-next-line:no-null-keyword
                contents: null,
            });
            const testInstance: Transform = gulpSharp({ transform: { resize: { fit: 'cover', width: 512 } } });
            testInstance.once('data', (file: Vinyl): void => {
                expect(file).to.deep.equal(testFile);
                done();
            });
            // write the fake file to it
            testInstance.end(testFile);
        });

        it('should throw if a stream is provided', function (done: Mocha.Done): void {
            const testFile: Vinyl.StreamFile = new Vinyl({
                base: '/test/',
                contents: new Readable(),
                cwd: '/',
                path: '/test/anywhere.jpg',
            });
            const testInstance: Transform = gulpSharp({ transform: { resize: { fit: 'cover', width: 512 } } });
            testInstance.once('data', function (): void {
                done(new Error('should not yield data'));
            });
            testInstance.once('error', (err: PluginError): void => {
                expect(err.message).to.deep.equal('Streams are not supported!');
                done();
            });
            // write the fake file to it
            testInstance.end(testFile);
        });

        it('should use sharp input config', function (done: Mocha.Done): void {
            const expectedWidth = 139;
            const testBuffer: Buffer = readFileSync('test/test.svg');
            const testFile: Vinyl = new Vinyl({
                base: '/test/',
                contents: testBuffer,
                cwd: '/',
                path: '/test/anywhere.jpg',
                sharp_config: {},
            });
            const testInstance: Transform = gulpSharp({
                config: {
                    density: 100,
                },
                transform: {},
            });
            const expectedHeight = 139;
            testInstance.once('data', (file: Vinyl): void => {
                sharp(file.contents as Buffer)
                    .metadata()
                    .then((meta: sharp.Metadata): void => {
                        // tslint:disable-next-line:no-unused-expression
                        expect(Vinyl.isVinyl(file)).to.be.true;
                        // tslint:disable-next-line:no-unused-expression
                        expect(file.isBuffer()).to.be.true;
                        expect(file.basename).to.equal(`anywhere_${expectedWidth}w_${expectedHeight}h.png`);
                        expect(meta.format).to.equal('png');
                        expect(meta.width).to.equal(expectedWidth, `Image should be ${expectedWidth} pixel wide`);
                        expect(meta.height).to.equal(expectedHeight, `Image should be ${expectedHeight} pixel high`);
                        done();
                    })
                    .catch(done);
            });
            // write the fake file to it
            testInstance.end(testFile);
        });

        it('should throw if no Config is provided', function (): void {
            expect(function (): void {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                gulpSharp(undefined as any);
            }).to.throws(Error, 'transform must be provided via config');
            expect(function (): void {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                gulpSharp({} as any);
            }).to.throws(Error, 'transform must be provided via config');
        });
    });
});
