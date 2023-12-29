/*
 * Package @donmahallem/label-pr
 * Source https://donmahallem.github.io/js-libs/
 */

import { calculateLabelDiff } from '@donmahallem/label-gh';
import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import * as esmock from 'esmock';
import 'mocha';
import Sinon from 'sinon';

/* eslint-disable @typescript-eslint/no-unsafe-argument,
 @typescript-eslint/no-explicit-any,
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/no-unsafe-call */
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
        let getPullRequestLabelsStub: Sinon.SinonStub;
        let syncLabelsStub: Sinon.SinonStub;
        let testMethod;
        before('setup octokit stub instance', async (): Promise<void> => {
            getPullRequestLabelsStub = sandbox.stub().named('getPullRequestLabels');
            syncLabelsStub = sandbox.stub().named('syncLabels');
            testMethod = (
                await esmock.strict('./sync-pr-labels.js', {
                    '@donmahallem/label-gh': {
                        calculateLabelDiff: calculateLabelDiff,
                        getPullRequestLabels: getPullRequestLabelsStub,
                        syncLabels: syncLabelsStub,
                    },
                })
            ).syncPRLabels;
        });
        beforeEach('setup octokit stub instance', (): void => {
            syncLabelsStub.resolves('set label');
        });
        it('should ignore non prefixed labels and set prefixed', (): Promise<void> => {
            getPullRequestLabelsStub.resolves([{ name: 'label1' }]);
            return testMethod(
                {} as Octokit,
                {
                    owner: 'some_owner',
                    pull_number: 2,
                    repo: 'anyrepo',
                },
                ['test', 'label']
            ).then((result: any): void => {
                expect(syncLabelsStub.callCount).to.equal(1, 'should be called');
                expect(syncLabelsStub.args).to.deep.eq([
                    [
                        {},
                        {
                            issue_number: 2,
                            owner: 'some_owner',
                            repo: 'anyrepo',
                        },
                        ['pkg:test', 'pkg:label', 'label1'],
                        true,
                    ],
                ]);
                expect(result).to.equal('set label');
            });
        });
        it('should ignore non prefixed labels and set non default prefix', (): Promise<void> => {
            getPullRequestLabelsStub.resolves([{ name: 'label1' }, { name: 'asdf:any' }]);
            return testMethod(
                {} as Octokit,
                {
                    owner: 'some_owner',
                    pull_number: 2,
                    repo: 'anyrepo',
                },
                ['test', 'label'],
                'asdf'
            ).then((result: any): void => {
                expect(syncLabelsStub.callCount).to.equal(1, 'should be called');
                expect(syncLabelsStub.args).to.deep.eq([
                    [
                        {},
                        {
                            issue_number: 2,
                            owner: 'some_owner',
                            repo: 'anyrepo',
                        },
                        ['asdf:test', 'asdf:label', 'label1'],
                        true,
                    ],
                ]);
                expect(result).to.equal('set label');
            });
        });
        it('should keep previous labels', (): Promise<void> => {
            getPullRequestLabelsStub.resolves([{ name: 'label1' }, { name: 'asdf:test' }]);
            return testMethod(
                {} as Octokit,
                {
                    owner: 'some_owner',
                    pull_number: 2,
                    repo: 'anyrepo',
                },
                ['test', 'label'],
                'asdf'
            ).then((result: any): void => {
                expect(syncLabelsStub.callCount).to.equal(1, 'should be called');
                expect(syncLabelsStub.args).to.deep.eq([
                    [
                        {},
                        {
                            issue_number: 2,
                            owner: 'some_owner',
                            repo: 'anyrepo',
                        },
                        ['asdf:label', 'asdf:test', 'label1'],
                        true,
                    ],
                ]);
                expect(result).to.equal('set label');
            });
        });
    });
});
