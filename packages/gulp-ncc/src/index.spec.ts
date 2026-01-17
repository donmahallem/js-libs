/**
 * Package @donmahallem/gulp-ncc
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index.js';
import { gulpNcc } from './plugin.js';

describe('index', function (): void {
    it('should export gulpNcc', function (): void {
        expect(index.gulpNcc).deep.equal(gulpNcc);
    });
});
