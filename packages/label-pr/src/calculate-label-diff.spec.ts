/*!
 * Source https://github.com/donmahallem/js-libs Package: label-pr
 */

import { expect } from 'chai';
import 'mocha';
import { calculateLabelDiff } from './calculate-label-diff';

describe('calculate-label-diff', (): void => {
    describe('calculate-label-diff', (): void => {
        it('should return items for all options', (): void => {
            expect(calculateLabelDiff(['test1', 'test2'], ['test2', 'test3']))
                .to.deep.equal({
                    add: ['test1'],
                    remove: ['test3'],
                    unchanged: ['test2'],
                });
        });
        it('should return no unchanged', (): void => {
            expect(calculateLabelDiff(['test1', 'test2'], ['test3']))
                .to.deep.equal({
                    add: ['test1', 'test2'],
                    remove: ['test3'],
                    unchanged: [],
                });
        });
        it('should work for empty expected array', (): void => {
            expect(calculateLabelDiff([], ['test3']))
                .to.deep.equal({
                    add: [],
                    remove: ['test3'],
                    unchanged: [],
                });
        });
        it('should work for empty current array', (): void => {
            expect(calculateLabelDiff(['test1', 'test2'], []))
                .to.deep.equal({
                    add: ['test1', 'test2'],
                    remove: [],
                    unchanged: [],
                });
        });
    });
});
