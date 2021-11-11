/*
 * Package @donmahallem/rollup-config
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import defaultConfig from './index';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
describe('index', (): void => {
    it('should set all plugins with default config', (): void => {
        const result: any = defaultConfig({ name: 'testname', version: '1.2.3' });
        expect(result.plugins).to.have.lengthOf(5);
    });
    it('should exclude commonjs with false as config', (): void => {
        const result: any = defaultConfig({ name: 'testname', version: '1.2.3' }, { plugins: { commonjs: false } });
        expect(result.plugins).to.have.lengthOf(4);
    });
    it('should exclude commonjs with false as config', (): void => {
        const result: any = defaultConfig({ name: 'testname', version: '1.2.3' }, { plugins: { json: false } });
        expect(result.plugins).to.have.lengthOf(4);
    });
});
