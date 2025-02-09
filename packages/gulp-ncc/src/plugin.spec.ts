/**
 * Package @donmahallem/gulp-ncc
 * Source https://donmahallem.github.io/js-libs/
 */

import 'mocha';
import * as sinon from 'sinon';

describe('plugin', function (): void {
    describe('gulpNcc', function (): void {
        describe('convert with object', function (): void {
            let dataSpy: sinon.SinonSpy;

            before(function (): void {
                dataSpy = sinon.spy();
            });

            afterEach(function (): void {
                dataSpy.resetHistory();
            });
            it('should convert the correct file').timeout('60s');
        });
    });
});
