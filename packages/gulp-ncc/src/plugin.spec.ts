/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-ncc
 */

import { expect } from 'chai';
import 'mocha';
import { join, resolve } from 'path';
import * as sinon from 'sinon';
import { Transform } from 'stream';
import Vinyl from 'vinyl';
import { gulpNcc } from './plugin';

describe('plugin', (): void => {
    describe('gulpNcc', (): void => {
        describe('convert with object', (): void => {
            let dataSpy: sinon.SinonSpy;
            before((): void => {
                dataSpy = sinon.spy();
            });

            afterEach((): void => {
                dataSpy.resetHistory();
            });
            it('should convert the correct file', (done: Mocha.Done): void => {
                const testFile: Vinyl = new Vinyl({
                    path: resolve(process.cwd(), './src/index.ts'),
                });
                const testInstance: Transform = gulpNcc({
                    quiet: true,
                    sourceMap: true,
                });
                testInstance.on('data', dataSpy);
                testInstance.on('error', (err: any): void => {
                    done(err);
                });
                testInstance.on('end', (): void => {
                    expect(dataSpy.callCount).to.equal(2, 'source should be provided');
                    const file1: Vinyl.BufferFile = dataSpy.getCall(0).args[0];
                    const file2: Vinyl.BufferFile = dataSpy.getCall(1).args[0];
                    // tslint:disable:no-unused-expression
                    expect(Vinyl.isVinyl(file1) as boolean).to.be.true;
                    expect(Vinyl.isVinyl(file2)).to.be.true;
                    // tslint:enable:no-unused-expression
                    expect(file1.path).to.equal(join(process.cwd(), 'src', 'index.js'), 'map file should output correct name');
                    expect(file2.path).to.equal(join(process.cwd(), 'src', 'index.map.js'), 'map file should output correct name');
                    done();
                });
                // write the fake file to it
                testInstance.end(testFile);
            }).timeout('60s');
        });
    });
});
