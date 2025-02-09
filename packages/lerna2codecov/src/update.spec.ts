/*
 * Package @donmahallem/lerna2codecov
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/lerna2codecov
 */

import { expect } from 'chai';
import esmock from 'esmock';
import 'mocha';
import sinon from 'sinon';
import type { update } from './update';
import type { updateConfig } from './update-config';
import type { readFile, writeFile } from 'node:fs/promises';

type WriteFileStub = sinon.SinonStub<Parameters<typeof writeFile>, ReturnType<typeof writeFile>>;
type ReadFileStub = sinon.SinonStub<Parameters<typeof readFile>, ReturnType<typeof readFile>>;
type updateConfigStub = sinon.SinonStub<Parameters<typeof updateConfig>, ReturnType<typeof updateConfig>>;

describe('./update', function (): void {
    let sandbox: sinon.SinonSandbox;

    before('setup sandbox', function (): void {
        sandbox = sinon.createSandbox();
    });

    afterEach('reset sandbox', function (): void {
        sandbox.reset();
    });

    after('restore sandbox', function (): void {
        sandbox.restore();
    });

    describe('update', function (): void {
        let fspWriteStub: WriteFileStub;
        let fspReadStub: ReadFileStub;
        let updateConfigStub: updateConfigStub;
        let updateMethod: typeof update;

        before('stup fs methods', async function (): Promise<void> {
            fspWriteStub = sandbox.stub().named('writeFile') as WriteFileStub;
            fspReadStub = sandbox.stub().named('readFile') as ReadFileStub;
            updateConfigStub = sandbox.stub().named('updateConfig') as updateConfigStub;
            updateMethod = (
                await esmock.strict(
                    './update',
                    {},
                    {
                        './update-config': { updateConfig: updateConfigStub },
                        'node:fs/promises': {
                            readFile: fspReadStub,
                            writeFile: fspWriteStub,
                        },
                    }
                )
            ).update as typeof update;
        });

        it('should output the input if no packages are found in the lerna project', async function (): Promise<void> {
            const codecovTestPath = './../../codecov.yml';
            fspReadStub.resolves('');
            updateConfigStub.resolves({ coverage: { status: undefined } });
            await updateMethod('./', codecovTestPath);
            expect(updateConfigStub.callCount).to.equal(1);
            expect(fspReadStub.getCall(0).args).to.deep.eq([codecovTestPath, 'utf-8']);
            expect(fspReadStub.callCount).to.equal(1);
            expect(fspReadStub.getCall(0).args).to.deep.eq([codecovTestPath, 'utf-8']);
            expect(fspWriteStub.callCount).to.equal(1);
            expect(fspWriteStub.getCall(0).args).to.deep.eq([codecovTestPath, 'coverage: {}\n', 'utf-8']);
        });

        it(`should create a codecov.yml if it doesn't exist`, async function (): Promise<void> {
            const codecovTestPath = './../../codecov.yml';
            fspReadStub.rejects(new Error('test error'));
            updateConfigStub.resolves({ coverage: { status: undefined } });
            await updateMethod('./', codecovTestPath);
            expect(updateConfigStub.callCount).to.equal(1);
            expect(fspReadStub.getCall(0).args).to.deep.eq([codecovTestPath, 'utf-8']);
            expect(fspReadStub.callCount).to.equal(1);
            expect(fspReadStub.getCall(0).args).to.deep.eq([codecovTestPath, 'utf-8']);
            expect(fspWriteStub.callCount).to.equal(1);
            expect(fspWriteStub.getCall(0).args).to.deep.eq([codecovTestPath, 'coverage: {}\n', 'utf-8']);
        });
    });
});
