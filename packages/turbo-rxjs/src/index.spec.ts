/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo-rxjs
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

describe('index', (): void => {
    it('should export expressObserver', (): void => {
        expect(index.expressObserver).to.exist;
    });
});
