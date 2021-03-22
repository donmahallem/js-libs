/*!
 * Source https://github.com/donmahallem/js-libs Package: label-pr
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

// tslint:disable:no-unused-expression
describe('index', (): void => {
    it('should export defaults', (): void => {
        expect(index.syncPRLabels).to.not.be.undefined;
    });
});
