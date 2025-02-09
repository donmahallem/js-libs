/*
 * Package @donmahallem/label-gh
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/label-gh
 */

import { expect } from 'chai';
import 'mocha';
import { calculateLabelDiff } from './calculate-label-diff.js';

describe('calculate-label-diff', function (): void {
    describe('calculate-label-diff', function (): void {
        it('should return items for all options', function (): void {
            expect(calculateLabelDiff(['test1', 'test2'], ['test2', 'test3'])).to.deep.equal({
                add: ['test1'],
                remove: ['test3'],
                unchanged: ['test2'],
            });
        });

        it('should return no unchanged', function (): void {
            expect(calculateLabelDiff(['test1', 'test2'], ['test3'])).to.deep.equal({
                add: ['test1', 'test2'],
                remove: ['test3'],
                unchanged: [],
            });
        });

        it('should work for empty expected array', function (): void {
            expect(calculateLabelDiff([], ['test3'])).to.deep.equal({
                add: [],
                remove: ['test3'],
                unchanged: [],
            });
        });

        it('should work for empty current array', function (): void {
            expect(calculateLabelDiff(['test1', 'test2'], [])).to.deep.equal({
                add: ['test1', 'test2'],
                remove: [],
                unchanged: [],
            });
        });
    });
});
