/*
 * Package @donmahallem/rollup-config
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import { RollupOptions } from 'rollup';
import defaultConfig from './index';

describe('index', (): void => {
    it('should set all plugins with default config', (): void => {
        const result: RollupOptions = defaultConfig({ name: 'testname', version: '1.2.3' });
        expect(result.plugins).to.have.lengthOf(5);
    });
});
