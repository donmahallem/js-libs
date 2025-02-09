/**
 * Package @donmahallem/label-pr
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index.js';

describe('index', function (): void {
    it('should export defaults', function (): void {
        expect(index.syncPRLabels).to.not.be.undefined;
    });
});
