/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { Octokit } from '@octokit/core';
import { expect } from 'chai';
import mockFetch from 'fetch-mock';
import 'mocha';
import { getGistFiles } from './get-gist-files';

describe('get-gist-files', (): void => {
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
    describe('getGistFiles', (): void => {
        it('should query correct gist id', async (): Promise<void> => {
            const mock = fetchSandbox.getOnce(
                'https://api.github.com/gists/any_id',
                { ok: true },
                {
                    headers: {
                        authorization: 'token secret123',
                    },
                }
            );

            const octokit = new Octokit({
                auth: 'token secret123',
                request: {
                    fetch: mock,
                },
            });

            const responseData: any = await getGistFiles('any_id', octokit);
            expect(responseData).to.deep.equal({ ok: true }, 'expect response body data')
        });
    });
});
