/*!
 * Source https://github.com/donmahallem/js-libs Package: rollup-config
 */

/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

describe('index', (): void => {
    it('should contain FlowApiValidator', (): void => {
        expect(index).to.not.equal(undefined);
    });
});
