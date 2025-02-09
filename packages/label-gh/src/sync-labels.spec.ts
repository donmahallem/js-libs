/**
 * Package @donmahallem/label-gh
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/label-gh
 */

import { expect } from 'chai';
import * as esmock from 'esmock';
import 'mocha';
import Sinon from 'sinon';
import type { addLabels } from './add-labels.js';
import type { setLabels } from './set-labels.js';
import type { syncLabels } from './sync-labels.js';

type AddLabelsStub = sinon.SinonStub<Parameters<typeof addLabels>, ReturnType<typeof addLabels>>;
type SetLabelsStub = sinon.SinonStub<Parameters<typeof setLabels>, ReturnType<typeof setLabels>>;
/* eslint-disable @typescript-eslint/no-explicit-any */
describe('syncLabels', function (): void {
    let sandbox: Sinon.SinonSandbox;

    before('setup sandbox', function (): void {
        sandbox = Sinon.createSandbox();
    });

    afterEach('reset sandbox', function (): void {
        sandbox.reset();
    });

    after('restore sandbox', function (): void {
        sandbox.restore();
    });

    describe('syncLabels', function (): void {
        let testMethod: typeof syncLabels;
        let addLabelsStub: AddLabelsStub;
        let setLabelsStub: SetLabelsStub;

        before('setup octokit stub instance', async function (): Promise<void> {
            addLabelsStub = sandbox.stub().named('addLabels') as AddLabelsStub;
            setLabelsStub = sandbox.stub().named('setLabels') as SetLabelsStub;
            testMethod = (
                await esmock.strict('./sync-labels', {
                    './add-labels': {
                        addLabels: addLabelsStub,
                    },
                    './set-labels': {
                        setLabels: setLabelsStub,
                    },
                })
            ).syncLabels as typeof syncLabels;
        });

        beforeEach('setup octokit stub instance', function (): void {
            addLabelsStub.resolves('add label' as any);
            setLabelsStub.resolves('set label' as any);
        });

        it('should call addLabel with replace parameter being false', function (): Promise<void> {
            return testMethod(
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

        it('should call setLabel with replace parameter being true', function (): Promise<void> {
            const testPromise: Promise<any> = testMethod(
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
