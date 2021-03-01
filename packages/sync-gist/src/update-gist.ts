/*!
 * Source https://github.com/donmahallem/js-libs Package: sync-gist
 */

import { Octokit } from '@octokit/core';
import {
    GistGetResponse,
    GistGetResponseData,
    ChangelogItem
} from './types';


export type UpdateParameter = {
    gist_id: string;
    files: { [key: string]: ChangelogItem },
    description?: string;
} & { [key: string]: any };
export const updateGist = async (cfg: UpdateParameter, octokit: Octokit): Promise<GistGetResponseData> => {
    const response: GistGetResponse = await octokit.request<'PATCH /gists/{gist_id}'>('PATCH /gists/{gist_id}', cfg);
    return response.data;
};
