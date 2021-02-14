/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

/*!
 * Source https://github.com/donmahallem/deploy-gist
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

describe('index', (): void => {
    it('should export defaults', (): void => {
        expect(index).to.not.equal(undefined);
    });
});
