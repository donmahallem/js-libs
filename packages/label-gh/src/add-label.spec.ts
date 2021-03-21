/*!
 * Source https://github.com/donmahallem/js-libs Package: label-gh
 */

import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import 'mocha';
import Sinon from 'sinon';
import { addLabels } from './add-labels';

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
            const testResponseData: string = 'any response';
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
                expect(requestStub.args).to.deep.eq([[
                    'POST /repos/{owner}/{repo}/issues/{issue_number}/labels',
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
