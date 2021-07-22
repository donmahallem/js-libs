/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { PRLabelsResponse } from './github-types';
import { getPullRequestLabels } from './pull-request-labels';

const API_ENDPOINT: string = 'GET /repos/{owner}/{repo}/pulls/{pull_number}';
describe('set-label', (): void => {
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
    describe('getPullRequestLabels', (): void => {
        let requestStub: Sinon.SinonStub<Parameters<Octokit['request']>>;
        before('setup octokit stub instance', (): void => {
            requestStub = sandbox.stub<Parameters<Octokit['request']>>();
        });
        it('should pass on all correct data', (): Promise<void> => {
            const testResponseData: Partial<PRLabelsResponse['data']> = {
                labels: [{
                    name: 'any response',
                }],
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
                expect(requestStub.args).to.deep.eq([[
                    API_ENDPOINT,
                    {
                        owner: 'some_owner',
                        pull_number: 2,
                        repo: 'anyrepo',
                    },
                ]]);
            });
        });
        it('should return empty array if labels isn\'t defined', (): Promise<void> => {
            const testResponseData: string = 'any response';
            requestStub.resolves({
                data: testResponseData,
            } as any);
            return getPullRequestLabels({ request: requestStub } as any, {
                owner: 'some_owner',
                pull_number: 2,
                repo: 'anyrepo',
            }).then((result: any): void => {
                expect(result).to.deep.equal([]);
                expect(requestStub.args).to.deep.eq([[
                    API_ENDPOINT,
                    {
                        owner: 'some_owner',
                        pull_number: 2,
                        repo: 'anyrepo',
                    },
                ]]);
            });
        });
        it('should return rejections', (): Promise<void> => {
            const testError: Error = new Error('test error');
            requestStub.rejects(testError);
            return getPullRequestLabels({ request: requestStub } as any, {
                owner: 'some_owner',
                pull_number: 2,
                repo: 'anyrepo',
            }).then((): void => {
                throw new Error('Should not resolve');
            }).catch((err: any): void => {
                expect(err).to.equal(testError);
                expect(requestStub.args).to.deep.eq([[
                    API_ENDPOINT,
                    {
                        owner: 'some_owner',
                        pull_number: 2,
                        repo: 'anyrepo',
                    },
                ]]);
            });
        });
    });
});
