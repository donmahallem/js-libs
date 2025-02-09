/**
 * Package @donmahallem/label-gh
 * Source https://github.com/donmahallem/js-libs/tree/master/packages/label-gh
 */

import { Octokit } from '@octokit/core';
import { GetRepoLabelsParameters, GetRepoLabelsResponse, GithubLabel } from './github-types.js';

export const getRepoLables = async (octokit: Octokit, params: GetRepoLabelsParameters): Promise<GithubLabel[]> => {
    const listFilesResponse: GetRepoLabelsResponse = await octokit.request('GET /repos/{owner}/{repo}/labels', params);
    return listFilesResponse.data;
};
