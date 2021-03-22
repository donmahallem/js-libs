/*!
 * Source https://github.com/donmahallem/js-libs Package: label-gh
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

// tslint:disable:no-unused-expression
describe('index', (): void => {
    it('should export defaults', (): void => {
        expect(index.syncLabels).to.not.be.undefined;
        expect(index.calculateLabelDiff).to.not.be.undefined;
        expect(index.getPullRequestLabels).to.not.be.undefined;
    });
});
