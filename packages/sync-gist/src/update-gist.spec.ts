/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import mockFetch from 'fetch-mock';
import 'mocha';
import { updateGist } from './update-gist';

describe('updateGist', (): void => {
    let fetchSandbox: mockFetch.FetchMockSandbox;
    before('setup tests', (): void => {
        fetchSandbox = mockFetch.sandbox();
    });

    afterEach('reset sandbox', (): void => {
        fetchSandbox.reset();
    });
    after('restore', (): void => {
        fetchSandbox.restore();
    });
    describe('updateGist', (): void => {
        it('should patch correct gist id with description', async (): Promise<void> => {
            const mock = fetchSandbox.patchOnce(
                'https://api.github.com/gists/any_id',
                { ok: true },
                {
                    headers: {
                        authorization: 'token secret123',
                    },
                    body: {
                        description: 'any title',
                        files: {},
                    }
                }
            );

            const octokit = new Octokit({
                auth: 'token secret123',
                request: {
                    fetch: mock,
                },
            });

            const responseData: any = await updateGist({
                description: 'any title',
                files: {},
                gist_id: 'any_id'
            }, octokit);
            expect(responseData).to.deep.equal({ ok: true }, 'expect response body data')
        });
        it('should patch correct gist id without description', async (): Promise<void> => {
            const mock = fetchSandbox.patchOnce(
                'https://api.github.com/gists/any_id',
                { ok: true },
                {
                    headers: {
                        authorization: 'token secret123',
                    },
                    body: {
                        files: {},
                    }
                }
            );

            const octokit = new Octokit({
                auth: 'token secret123',
                request: {
                    fetch: mock,
                },
            });

            const responseData: any = await updateGist({
                files: {},
                gist_id: 'any_id',
            }, octokit);
            expect(responseData).to.deep.equal({ ok: true }, 'expect response body data')
        });
    });
});
