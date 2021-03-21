/*!
 * Source https://github.com/donmahallem/js-libs Package: label-pr
 */

import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { setLabels } from './set-labels';

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
    describe('setLabels', (): void => {
        let requestStub: Sinon.SinonStub<Parameters<Octokit['request']>>;
        before('setup octokit stub instance', (): void => {
            requestStub = sandbox.stub<Parameters<Octokit['request']>>();
        });
        it('should pass on all correct data', (): Promise<void> => {
            const testResponseData: string = 'any response';
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
                expect(requestStub.args).to.deep.eq([[
                    'PUT /repos/{owner}/{repo}/issues/{issue_number}/labels',
                    {
                        issue_number: 2,
                        labels: [
                            'test',
                            'label',
                        ],
                        owner: 'some_owner',
                        repo: 'anyrepo',
                    },
                ]]);
            });
        });
    });
});
