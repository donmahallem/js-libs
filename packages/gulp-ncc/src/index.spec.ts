/**
 * Package @donmahallem/gulp-ncc
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';
import { gulpNcc } from './plugin';

describe('index', function (): void {
    it('should export gulpNcc', function (): void {
        expect(index.gulpNcc).deep.equal(gulpNcc);
    });
});
