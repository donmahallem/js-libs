/*
 * Package @donmahallem/label-gh
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/label-gh
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index.js';

/* eslint-disable @typescript-eslint/no-unused-expressions */
describe('index', function (): void {
    it('should export defaults', function (): void {
        expect(index.syncLabels).to.not.be.undefined;
        expect(index.calculateLabelDiff).to.not.be.undefined;
        expect(index.getPullRequestLabels).to.not.be.undefined;
    });
});
