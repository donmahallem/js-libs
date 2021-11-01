/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import * as addLabels from './add-labels';
import * as setLabels from './set-labels';
import { syncLabels } from './sync-labels';

/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */
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
        let addLabelsStub: Sinon.SinonStub<Parameters<typeof addLabels['addLabels']>>;
        let setLabelsStub: Sinon.SinonStub<Parameters<typeof setLabels['setLabels']>>;
        before('setup octokit stub instance', (): void => {
            addLabelsStub = sandbox.stub(addLabels, 'addLabels');
            setLabelsStub = sandbox.stub(setLabels, 'setLabels');
        });
        beforeEach('setup octokit stub instance', (): void => {
            addLabelsStub.resolves('add label');
            setLabelsStub.resolves('set label');
        });
        it('should call addLabel with replace parameter being false', (): Promise<void> => {
            return syncLabels(
                {} as any,
                {
                    issue_number: 2,
                    owner: 'some_owner',
                    repo: 'anyrepo',
                },
                ['test', 'label'],
                false
            ).then((result: any): void => {
                expect(setLabelsStub.callCount).to.equal(0, 'should not be called');
                expect(addLabelsStub.args).to.deep.eq([
                    [
                        {},
                        {
                            issue_number: 2,
                            labels: ['test', 'label'],
                            owner: 'some_owner',
                            repo: 'anyrepo',
                        },
                    ],
                ]);
                expect(result).to.equal('add label');
            });
        });
        it('should call setLabel with replace parameter being true', (): Promise<void> => {
            const testPromise: Promise<any> = syncLabels(
                {} as any,
                {
                    issue_number: 2,
                    owner: 'some_owner',
                    repo: 'anyrepo',
                },
                ['test', 'label'],
                true
            );
            return testPromise.then((result: any): void => {
                expect(addLabelsStub.callCount).to.equal(0, 'should not be called');
                expect(setLabelsStub.args).to.deep.eq([
                    [
                        {},
                        {
                            issue_number: 2,
                            labels: ['test', 'label'],
                            owner: 'some_owner',
                            repo: 'anyrepo',
                        },
                    ],
                ]);
                expect(result).to.equal('set label');
            });
        });
    });
});
