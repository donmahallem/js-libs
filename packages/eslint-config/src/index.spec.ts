/*
 * Package @donmahallem/eslint-config
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as defaultConfig from './index';

describe('index', (): void => {
    it('should be defined', (): void => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(defaultConfig).to.have.exist;
    });
});
