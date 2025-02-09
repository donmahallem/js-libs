/*
 * Package @donmahallem/label-gh
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/label-gh
 */

import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { getPullRequestLabels } from './pull-request-labels.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
const API_ENDPOINT = 'GET /repos/{owner}/{repo}/pulls/{pull_number}';
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

    describe('getPullRequestLabels', function (): void {
        let requestStub: Sinon.SinonStub<Parameters<Octokit['request']>, Partial<ReturnType<Octokit['request']>>>;

        before('setup octokit stub instance', function (): void {
            requestStub = sandbox.stub<Parameters<Octokit['request']>, Partial<ReturnType<Octokit['request']>>>();
        });

        it('should pass on all correct data', function (): Promise<void> {
            const testResponseData: any = {
                labels: ['any response'],
            };
            requestStub.resolves({
                data: testResponseData,
            });
            return getPullRequestLabels({ request: requestStub } as any, {
                owner: 'some_owner',
                pull_number: 2,
                repo: 'anyrepo',
            }).then((result: any): void => {
                expect(result).to.deep.equal(testResponseData.labels);
                expect(requestStub.args).to.deep.eq([
                    [
                        API_ENDPOINT,
                        {
                            owner: 'some_owner',
                            pull_number: 2,
                            repo: 'anyrepo',
                        },
                    ],
                ]);
            });
        });

        it(`should return empty array if labels isn't defined`, function (): Promise<void> {
            const testResponseData = 'any response';
            requestStub.resolves({
                data: testResponseData,
            } as any);
            return getPullRequestLabels({ request: requestStub } as any, {
                owner: 'some_owner',
                pull_number: 2,
                repo: 'anyrepo',
            }).then((result: any): void => {
                expect(result).to.deep.equal([]);
                expect(requestStub.args).to.deep.eq([
                    [
                        API_ENDPOINT,
                        {
                            owner: 'some_owner',
                            pull_number: 2,
                            repo: 'anyrepo',
                        },
                    ],
                ]);
            });
        });

        it('should return rejections', function (): Promise<void> {
            const testError: Error = new Error('test error');
            requestStub.rejects(testError);
            return getPullRequestLabels({ request: requestStub } as any, {
                owner: 'some_owner',
                pull_number: 2,
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
                                owner: 'some_owner',
                                pull_number: 2,
                                repo: 'anyrepo',
                            },
                        ],
                    ]);
                });
        });
    });
});
