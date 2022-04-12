/*
 * Package @donmahallem/label-pr
 * Source https://donmahallem.github.io/js-libs/
 */

import * as labelgh from '@donmahallem/label-gh';
import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { syncPRLabels } from './sync-pr-labels';

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
        before('setup octokit stub instance', (): void => {
            getPullRequestLabelsStub = sandbox.stub(labelgh, 'getPullRequestLabels');
            syncLabelsStub = sandbox.stub(labelgh, 'syncLabels');
        });
        beforeEach('setup octokit stub instance', (): void => {
            syncLabelsStub.resolves('set label');
        });
        it('should ignore non prefixed labels and set prefixed', (): Promise<void> => {
            getPullRequestLabelsStub.resolves([{ name: 'label1' }]);
            return syncPRLabels(
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
            return syncPRLabels(
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
            return syncPRLabels(
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
