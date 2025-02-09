/*
 * Package @donmahallem/rxjs-zone
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as idx from './index';

/* eslint-disable @typescript-eslint/no-unused-expressions */
describe('index', function (): void {
    it('should export runInsideZone', function (): void {
        expect(idx.runInsideZone).to.not.be.undefined;
    });

    it('should export runOutsideZone', function (): void {
        expect(idx.runOutsideZone).to.not.be.undefined;
    });
});
