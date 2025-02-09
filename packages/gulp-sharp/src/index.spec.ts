/**
 * Package @donmahallem/gulp-sharp
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

describe('index', function (): void {
    it('should contain FlowApiValidator', function (): void {
        expect(index).to.not.equal(undefined);
    });
});
