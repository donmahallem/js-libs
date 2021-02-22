/*!
 * Source https://github.com/donmahallem/js-libs Package: turbo
 */

import { expect } from 'chai';
import 'mocha';
import * as index from './index';

// tslint:disable:no-unused-expression
describe('index', (): void => {
    it('should contain FlowApiValidator', (): void => {
        expect(index.RequestError).to.to.exist;
        expect(index.promiseRequestHandler).to.to.exist;
        expect(index.promiseToResponse).to.to.exist;
    });
});
