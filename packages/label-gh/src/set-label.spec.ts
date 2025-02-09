/*
 * Package @donmahallem/label-gh
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/label-gh
 */

import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { setLabels } from './set-labels.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
const API_ENDPOINT = 'PUT /repos/{owner}/{repo}/issues/{issue_number}/labels';
describe('set-label', function (): void {
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

    describe('setLabels', function (): void {
        let requestStub: Sinon.SinonStub<Parameters<Octokit['request']>>;

        before('setup octokit stub instance', function (): void {
            requestStub = sandbox.stub<Parameters<Octokit['request']>>();
        });

        it('should pass on all correct data', function (): Promise<void> {
            const testResponseData = 'any response';
            requestStub.resolves({
                data: testResponseData,
            } as any);
            return setLabels({ request: requestStub } as any, {
                issue_number: 2,
                labels: ['test', 'label'],
                owner: 'some_owner',
                repo: 'anyrepo',
            }).then((result: any): void => {
                expect(result).to.equal(testResponseData);
                expect(requestStub.args).to.deep.eq([
                    [
                        API_ENDPOINT,
                        {
                            issue_number: 2,
                            labels: ['test', 'label'],
                            owner: 'some_owner',
                            repo: 'anyrepo',
                        },
                    ],
                ]);
            });
        });

        it('should return rejections', function (): Promise<void> {
            const testError: Error = new Error('test error');
            requestStub.rejects(testError);
            return setLabels({ request: requestStub } as any, {
                issue_number: 2,
                labels: ['test', 'label'],
                owner: 'some_owner',
                repo: 'anyrepo',
            })
                .then(function (): void {
                    throw new Error('Should not resolve');
                })
                .catch((err: any): void => {
                    expect(err).to.equal(testError);
                    expect(requestStub.args).to.deep.eq([
                        [
                            API_ENDPOINT,
                            {
                                issue_number: 2,
                                labels: ['test', 'label'],
                                owner: 'some_owner',
                                repo: 'anyrepo',
                            },
                        ],
                    ]);
                });
        });
    });
});
