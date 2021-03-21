/*!
 * Source https://github.com/donmahallem/js-libs Package: label-pr
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

// tslint:disable:no-unused-expression
describe('index', (): void => {
    it('should export defaults', (): void => {
        expect(index.syncPrLabels).to.not.be.undefined;
        expect(index.calculateLabelDiff).to.not.be.undefined;
    });
});
