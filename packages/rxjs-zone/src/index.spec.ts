/*
 * Package @donmahallem/rxjs-zone
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as idx from './index';

// tslint:disable:no-unused-expression
describe('index', (): void => {
    it('should export runInsideZone', (): void => {
        expect(idx.runInsideZone).to.not.be.undefined;
    });
    it('should export runOutsideZone', (): void => {
        expect(idx.runOutsideZone).to.not.be.undefined;
    });
});
