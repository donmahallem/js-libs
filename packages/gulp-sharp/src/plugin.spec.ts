/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import { expect } from 'chai';
import { readFileSync } from 'fs';
import 'mocha';
import * as sharp from 'sharp';
import { Transform } from 'stream';
import * as Vinyl from 'vinyl';
import { gulpSharp } from './plugin';

const testFormats: (keyof sharp.FormatEnum)[] = ['jpeg', 'png', 'webp'];
const testSizes: number[] = [128, 256, 1024];
describe('plugin', (): void => {
    describe('gulpSharp', (): void => {
        describe('convert with object', (): void => {
            testFormats.forEach((expectedFormat: any): void => {
                it('should convert the image to ' + expectedFormat + ' and keep size', (done: Mocha.Done): void => {
                    const testBuffer: Buffer = readFileSync('test/test.png');
                    const testFile: Vinyl = new Vinyl({ contents: testBuffer });
                    const testInstance: Transform = gulpSharp({ transform: { format: expectedFormat } });

                    testInstance.once('data', (file: Vinyl): void => {
                        // tslint:disable-next-line:no-unused-expression
                        expect(Vinyl.isVinyl(file)).to.be.true;
                        // tslint:disable-next-line:no-unused-expression
                        expect(file.isBuffer()).to.be.true;
                        sharp(file.contents as Buffer)
                            .metadata()
                            .then((meta: sharp.Metadata): void => {
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
                it('should keep format and scale the image to fit width ' + expectedWidth, (done: Mocha.Done): void => {
                    const testBuffer: Buffer = readFileSync('test/test.png');
                    const testFile: Vinyl = new Vinyl({ contents: testBuffer });
                    const testInstance: Transform = gulpSharp({ transform: { resize: { width: expectedWidth, fit: 'cover' } } });
                    const expectedHeight: number = Math.round(expectedWidth * 564 / 696);

                    testInstance.once('data', (file: Vinyl): void => {
                        // tslint:disable-next-line:no-unused-expression
                        expect(Vinyl.isVinyl(file)).to.be.true;
                        // tslint:disable-next-line:no-unused-expression
                        expect(file.isBuffer()).to.be.true;
                        sharp(file.contents as Buffer)
                            .metadata()
                            .then((meta: sharp.Metadata): void => {
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
                it('should keep format and scale the image to fit height ' + expectedHeight, (done: Mocha.Done): void => {
                    const testBuffer: Buffer = readFileSync('test/test.png');
                    const testFile: Vinyl = new Vinyl({ contents: testBuffer });
                    const testInstance: Transform = gulpSharp({ transform: { resize: { height: expectedHeight, fit: 'cover' } } });
                    const expectedWidth: number = Math.round(expectedHeight * 696 / 564);

                    testInstance.once('data', (file: Vinyl): void => {
                        // tslint:disable-next-line:no-unused-expression
                        expect(Vinyl.isVinyl(file)).to.be.true;
                        // tslint:disable-next-line:no-unused-expression
                        expect(file.isBuffer()).to.be.true;
                        sharp(file.contents as Buffer)
                            .metadata()
                            .then((meta: sharp.Metadata): void => {
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
            it('should override default config with the VinylFile provided', (done: Mocha.Done): void => {
                const expectedWidth: number = 128;
                const testBuffer: Buffer = readFileSync('test/test.png');
                const testFile: Vinyl = new Vinyl({
                    contents: testBuffer,
                    sharp_config: { transform: { resize: { width: expectedWidth } } },
                });
                const testInstance: Transform = gulpSharp({ transform: { resize: { width: 512, fit: 'cover' } } });
                const expectedHeight: number = Math.round(128 * 564 / 696);
                testInstance.once('data', (file: Vinyl): void => {
                    // tslint:disable-next-line:no-unused-expression
                    expect(Vinyl.isVinyl(file)).to.be.true;
                    // tslint:disable-next-line:no-unused-expression
                    expect(file.isBuffer()).to.be.true;
                    sharp(file.contents as Buffer)
                        .metadata()
                        .then((meta: sharp.Metadata): void => {
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
    });
});
