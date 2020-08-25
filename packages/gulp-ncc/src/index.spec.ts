/*!
 * Source https://github.com/donmahallem/js-libs Package: gulp-ncc
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';
import { gulpNcc } from './plugin';

describe('index', (): void => {
    it('should export gulpNcc', (): void => {
        expect(index.gulpNcc).deep.equal(gulpNcc);
    });
});
