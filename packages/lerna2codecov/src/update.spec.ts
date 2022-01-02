/*
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

import { expect } from 'chai';
import { promises as fsp } from 'fs';
import 'mocha';
import sinon from 'sinon';
import { update } from './update';
import * as updateConfig from './update-config';

/* eslint-disable @typescript-eslint/no-unused-expressions, no-unused-expressions */
describe('./update', (): void => {
    let sandbox: sinon.SinonSandbox;
    before('setup sandbox', (): void => {
        sandbox = sinon.createSandbox();
    });
    afterEach('reset sandbox', (): void => {
        sandbox.reset();
    });
    after('restore sandbox', (): void => {
        sandbox.restore();
    });
    describe('update', (): void => {
        let fspWriteStub: sinon.SinonStub;
        let fspReadStub: sinon.SinonStub;
        let updateConfigStub: sinon.SinonStub;
        before('stup fs methods', (): void => {
            fspWriteStub = sandbox.stub(fsp, 'writeFile');
            fspReadStub = sandbox.stub(fsp, 'readFile');
            updateConfigStub = sandbox.stub(updateConfig, 'updateConfig');
        });
        after((): void => {
            updateConfigStub.restore();
        });

        it('should output the input if no packages are found in the lerna project', async (): Promise<void> => {
            const codecovTestPath = './../../codecov.yml';
            fspReadStub.resolves('');
            updateConfigStub.resolves({ asdf: true });
            await update('./', codecovTestPath);
            expect(fspReadStub.callCount).to.equal(1);
            expect(fspReadStub.getCall(0).args).to.deep.eq([codecovTestPath, 'utf-8']);
            expect(fspWriteStub.callCount).to.equal(1);
            expect(fspWriteStub.getCall(0).args).to.deep.eq([codecovTestPath, 'asdf: true\n', 'utf-8']);
        });
        it("should create a codecov.yml if it doesn't exist", async (): Promise<void> => {
            const codecovTestPath = './../../codecov.yml';
            fspReadStub.rejects(new Error('test error'));
            updateConfigStub.resolves({ asdf: true });
            await update('./', codecovTestPath);
            expect(fspReadStub.callCount).to.equal(1);
            expect(fspReadStub.getCall(0).args).to.deep.eq([codecovTestPath, 'utf-8']);
            expect(fspWriteStub.callCount).to.equal(1);
            expect(fspWriteStub.getCall(0).args).to.deep.eq([codecovTestPath, 'asdf: true\n', 'utf-8']);
        });
    });
});
