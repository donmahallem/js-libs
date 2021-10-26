/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

// tslint:disable:no-unused-expression
describe('index', (): void => {
    it('should export defaults', (): void => {
        expect(index.readFile).to.not.be.undefined;
        expect(index.readdir).to.not.be.undefined;
    });
});
