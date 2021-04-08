/*!
 * Source https://github.com/donmahallem/js-libs Package: rollup-config
 */

/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-sharp
 */

import { expect } from 'chai';
import 'mocha';
import defaultConfig from './index';

describe('index', (): void => {
    it('should set all plugins with default config', (): void => {
        const result: any = defaultConfig({ name: 'testname', version: '1.2.3' });
        expect(result.plugins).to.have.lengthOf(4);
    });
    it('should exclude commonjs with false as config', (): void => {
        const result: any = defaultConfig({ name: 'testname', version: '1.2.3' },
            { plugins: { commonjs: false } });
        expect(result.plugins).to.have.lengthOf(3);
    });
});
