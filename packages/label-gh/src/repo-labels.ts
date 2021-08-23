/*
 * Package @donmahallem/label-gh
 * Source https://donmahallem.github.io/js-libs/
 */

import { Octokit } from '@octokit/core';
import { GetRepoLabelsParameters, GetRepoLabelsResponse, GithubLabel } from './github-types';

export const getRepoLables = async (octokit: Octokit, params: GetRepoLabelsParameters): Promise<GithubLabel[]> => {
    const listFilesResponse: GetRepoLabelsResponse = await octokit.request('GET /repos/{owner}/{repo}/labels', params);
    return listFilesResponse.data;
};
