/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { addLabels } from './add-labels';

const API_ENDPOINT = 'POST /repos/{owner}/{repo}/issues/{issue_number}/labels';
describe('add-label', (): void => {
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
    describe('addLabel', (): void => {
        let requestStub: Sinon.SinonStub<Parameters<Octokit['request']>>;
        before('setup octokit stub instance', (): void => {
            requestStub = sandbox.stub<Parameters<Octokit['request']>>();
        });
        it('should pass on all correct data', (): Promise<void> => {
            const testResponseData = 'any response';
            requestStub.resolves({
                data: testResponseData,
            } as any);
            return addLabels({ request: requestStub } as any, {
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
        it('should return rejections', (): Promise<void> => {
            const testError: Error = new Error('test error');
            requestStub.rejects(testError);
            return addLabels({ request: requestStub } as any, {
                issue_number: 2,
                labels: ['test', 'label'],
                owner: 'some_owner',
                repo: 'anyrepo',
            })
                .then((result: any): void => {
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
