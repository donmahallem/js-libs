/*
 * Package @donmahallem/turbo
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/turbo
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index.js';

describe('index', function (): void {
    it('should contain FlowApiValidator', function (): void {
        expect(index.RequestError).to.to.exist;
        expect(index.promiseRequestHandler).to.to.exist;
        expect(index.promiseToResponse).to.to.exist;
    });
});
