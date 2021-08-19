/*
 * Package @donmahallem/readme
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import * as idx from './index';

describe('syncLabels', (): void => {
    let sandbox: Sinon.SinonSandbox;
    before('setup sandbox', (): void => {
        sandbox = Sinon.createSandbox();
    });
    afterEach('reset sandbox', (): void => {
        sandbox.reset();
    });
    after('restore sandbox', (): void => {
        sandbox.restore();
    });
    describe('syncLabels', (): void => {
        it('should call addLabel with replace parameter being false', (): Promise<void> => {
            return idx.command().then((result: void): void => {
                expect(12).to.equal('add label');
            });
        });
    });
});
