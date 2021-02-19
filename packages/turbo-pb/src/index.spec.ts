/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo-pb
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

describe('index', (): void => {
    it('should contain FlowApiValidator', (): void => {
        expect(index).to.not.equal(undefined);
    });
});
