/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

describe('index', (): void => {
    it('should export defaults', (): void => {
        expect(index.syncPrLabels).to.not.be.undefined;
        expect(index.calculateLabelDiff).to.not.be.undefined;
    });
});
