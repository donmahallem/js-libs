/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

/* eslint-disable no-unused-expressions, @typescript-eslint/no-unused-expressions */
describe('index', (): void => {
    it('should export defaults', (): void => {
        expect(index.syncLabels).to.not.be.undefined;
        expect(index.calculateLabelDiff).to.not.be.undefined;
        expect(index.getPullRequestLabels).to.not.be.undefined;
    });
});
