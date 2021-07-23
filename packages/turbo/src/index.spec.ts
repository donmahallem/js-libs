/*
 * Package @donmahallem/turbo
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/turbo
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

/* eslint-disable @typescript-eslint/no-unused-expressions, no-unused-expressions */
describe('index', (): void => {
    it('should contain FlowApiValidator', (): void => {
        expect(index.RequestError).to.to.exist;
        expect(index.promiseRequestHandler).to.to.exist;
        expect(index.promiseToResponse).to.to.exist;
    });
});
