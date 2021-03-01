/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { Octokit } from '@octokit/core';
import {
    GistGetResponse,
    GistGetResponseData
} from './types';

export const getGistFiles = async (gistId: string, octokit: Octokit): Promise<GistGetResponseData> => {
    const response: GistGetResponse = await octokit.request('GET /gists/{gist_id}', {
        gist_id: gistId,
    });
    return response.data;
};
